// Klopjag site server
// Serves the static site (../public) and stores fan-submitted stories
// in a simple JSON file at ./data/stories.json.
//
// This is intentionally dependency-light (just Express) so it runs on
// almost any Node host. If the archive grows large or you want
// multiple writers, swap `store.js` for a real database (Postgres,
// SQLite via better-sqlite3, etc.) without changing the routes below.

const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Tiny built-in .env loader (no extra dependency). Most hosts let you set
// environment variables in a dashboard instead - this is just for local dev.
(function loadDotEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;
  fs.readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = (m[2] || '').replace(/^["']|["']$/g, '');
  });
})();

const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || '';
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || '';
// When the site (Afrihost) and this API (Render/Railway/etc.) are served from different
// domains, the browser needs the API to explicitly allow that origin. Comma-separate more
// than one (e.g. the live domain plus a staging/preview URL). Leave unset and CORS is skipped
// entirely - fine for the old all-in-one setup where this server also serves the site itself.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
const DATA_FILE = path.join(__dirname, 'data', 'stories.json');
const NOTIFY_FILE = path.join(__dirname, 'data', 'ticket-notify.json');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

if (!ADMIN_KEY) {
  console.warn('[klopjag] WARNING: ADMIN_KEY is not set. The admin archive view will refuse all requests until you set it (see .env.example).');
}

// ---------- tiny JSON-file store ----------
function ensureDataFile() {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}
ensureDataFile();

let writeQueue = Promise.resolve();
function readAll() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '[]');
  } catch (e) {
    console.error('[klopjag] could not read stories.json, starting fresh:', e.message);
    return [];
  }
}
function appendStory(story) {
  // Serialize writes so concurrent submissions can't clobber each other.
  writeQueue = writeQueue.then(() => {
    const all = readAll();
    all.push(story);
    fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf8');
  });
  return writeQueue;
}
function deleteStory(id) {
  writeQueue = writeQueue.then(() => {
    const all = readAll().filter((s) => s.id !== id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf8');
  });
  return writeQueue;
}
function setStoryStatus(id, status) {
  writeQueue = writeQueue.then(() => {
    const all = readAll();
    const story = all.find((s) => s.id === id);
    if (story) story.status = status;
    fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf8');
  });
  return writeQueue;
}

// ---------- ticket-notify signups ("laat weet my as kaartjies beskikbaar is") ----------
// Separate small JSON file from the story archive - different shape, different audience (ticketing/marketing later).
function ensureNotifyFile() {
  fs.mkdirSync(path.dirname(NOTIFY_FILE), { recursive: true });
  if (!fs.existsSync(NOTIFY_FILE)) fs.writeFileSync(NOTIFY_FILE, '[]', 'utf8');
}
ensureNotifyFile();

let notifyWriteQueue = Promise.resolve();
function readAllNotify() {
  try {
    return JSON.parse(fs.readFileSync(NOTIFY_FILE, 'utf8') || '[]');
  } catch (e) {
    console.error('[klopjag] could not read ticket-notify.json, starting fresh:', e.message);
    return [];
  }
}
function appendNotifySignup(entry) {
  notifyWriteQueue = notifyWriteQueue.then(() => {
    const all = readAllNotify();
    // Skip exact duplicate emails so one person double-clicking doesn't spam Slack or the CSV.
    if (all.some((s) => s.email.toLowerCase() === entry.email.toLowerCase())) return;
    all.push(entry);
    fs.writeFileSync(NOTIFY_FILE, JSON.stringify(all, null, 2), 'utf8');
  });
  return notifyWriteQueue;
}

// Optional: post to a Slack channel via an Incoming Webhook the moment someone signs up.
// Set SLACK_WEBHOOK_URL (Slack -> your workspace -> Apps -> Incoming Webhooks -> Add to Slack,
// pick the channel, copy the "https://hooks.slack.com/services/..." URL into .env). Leave unset
// to skip Slack entirely - signups are still saved to ticket-notify.json either way.
function notifySlack(entry) {
  if (!SLACK_WEBHOOK_URL) return;
  fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: `\u{1F3AB} Kaartjie-belangstelling: *${entry.name}* <mailto:${entry.email}|${entry.email}>` }),
  }).catch((e) => console.error('[klopjag] Slack notify failed:', e.message));
}

// ---------- tiny in-memory rate limiter ----------
// Max 8 submissions per IP per hour. Good enough to blunt casual spam;
// put this behind a real WAF/rate-limiter if the site gets popular.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 8;
}

// ---------- validation ----------
const CATEGORIES = ["'n Herinnering", "'n Fun fact", 'Wat dit vir my beteken', "'n Boodskap aan die band", 'Ek wil saam sing by die 25 jaar show'];
const STATUSES = ['pending', 'approved'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function clean(str, max) {
  return String(str || '').replace(/\s+/g, ' ').trim().slice(0, max);
}
function validateStory(body) {
  const text = clean(body.text, 2000);
  if (!text) return 'Skryf gerus eers \'n storie voordat jy dit stuur.';
  if (text.length < 3) return 'Die storie lyk te kort — vertel ons \'n bietjie meer.';
  return null;
}

const app = express();
app.set('trust proxy', 1); // most hosts (Render, Railway, Nginx) sit one hop in front - this makes rate limiting see the real visitor IP
app.use(express.json({ limit: '100kb' }));
app.disable('x-powered-by');

// Basic security headers (no extra dependency)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// CORS: only needed when the site and this API live on different domains (see ALLOWED_ORIGINS
// above). No extra dependency - a handful of headers is all cross-origin fetch() needs.
if (ALLOWED_ORIGINS.length) {
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Key');
    }
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  });
}

app.use(express.static(PUBLIC_DIR));

// Health check - also doubles as a "wake up" ping the site itself calls on page load,
// since Render's free tier spins this server down after ~15 min of no traffic and the
// next real request then has to wait ~30-50s for it to spin back up. Cheap on purpose:
// no file reads, no auth, just confirms the process is alive (and awake).
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Public: recent stories (for the archive preview on the site itself)
// Only band-approved submissions show here — see the admin "OK" button.
app.get('/api/stories', (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 30, 100);
  const all = readAll()
    .filter((s) => s.status === 'approved')
    .slice()
    .reverse()
    .slice(0, limit)
    // Contact details are for the band's follow-up only - never exposed on the public archive preview.
    .map((s) => ({ name: s.name, song: s.song, category: s.category, venue: s.venue, when: s.when, text: s.text, link: s.link, createdAt: s.createdAt }));
  res.json(all);
});

// Public: submit a story
app.post('/api/stories', async (req, res) => {
  const err = validateStory(req.body || {});
  if (err) return res.status(400).json({ error: err });

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  if (rateLimited(String(ip).split(',')[0].trim())) {
    return res.status(429).json({ error: 'Te veel stories van hierdie verbinding — probeer later weer.' });
  }

  const story = {
    id: crypto.randomUUID(),
    name: clean(req.body.name, 80) || 'Anoniem',
    contact: clean(req.body.contact, 200), // admin-only - never returned by the public GET below
    song: clean(req.body.song, 120) || 'Algemeen / General',
    category: CATEGORIES.includes(req.body.category) ? req.body.category : CATEGORIES[0],
    venue: clean(req.body.venue, 120),
    when: clean(req.body.when, 120),
    text: clean(req.body.text, 2000),
    link: clean(req.body.link, 300),
    status: 'pending', // a band member OKs it in /admin.html before it shows on the public site
    createdAt: new Date().toISOString(),
  };
  await appendStory(story);
  res.status(201).json({ ok: true });
});

// Public: "laat weet my as die kaartjies beskikbaar is" signup (25 Jaar Show card)
app.post('/api/notify-signup', async (req, res) => {
  const name = clean(req.body.name, 80);
  const email = clean(req.body.email, 200);
  if (!name) return res.status(400).json({ error: 'Gee asseblief jou naam.' });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: "Gee asseblief 'n geldige e-posadres." });

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  if (rateLimited(String(ip).split(',')[0].trim() + ':notify')) {
    return res.status(429).json({ error: 'Te veel aanvrae van hierdie verbinding — probeer later weer.' });
  }

  const entry = { id: crypto.randomUUID(), name, email, createdAt: new Date().toISOString() };
  await appendNotifySignup(entry);
  notifySlack(entry);
  res.status(201).json({ ok: true });
});

// ---------- admin (band-only) ----------
function requireAdmin(req, res, next) {
  const key = req.headers['x-admin-key'] || req.query.key;
  if (!ADMIN_KEY || key !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Missing or incorrect admin key.' });
  }
  next();
}

app.get('/api/admin/stories', requireAdmin, (req, res) => {
  res.json(readAll().slice().reverse());
});

app.delete('/api/admin/stories/:id', requireAdmin, async (req, res) => {
  await deleteStory(req.params.id);
  res.json({ ok: true });
});

// Approve/un-approve a submission. Only 'approved' stories show on the public site.
app.post('/api/admin/stories/:id/status', requireAdmin, async (req, res) => {
  const status = req.body && req.body.status;
  if (!STATUSES.includes(status)) return res.status(400).json({ error: 'Onbekende status.' });
  await setStoryStatus(req.params.id, status);
  res.json({ ok: true });
});

app.get('/api/admin/export.csv', requireAdmin, (req, res) => {
  const rows = readAll();
  const esc = (v) => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  const header = ['createdAt', 'status', 'name', 'contact', 'song', 'category', 'venue', 'when', 'text', 'link'];
  const csv = [header.join(',')]
    .concat(rows.map((r) => header.map((h) => esc(r[h])).join(',')))
    .join('\r\n');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="klopjag-stories.csv"');
  res.send(csv);
});

// "Laat weet my as kaartjies beskikbaar is" signups - band-only list + CSV, same admin key as stories.
app.get('/api/admin/notify-signups', requireAdmin, (req, res) => {
  res.json(readAllNotify().slice().reverse());
});

app.delete('/api/admin/notify-signups/:id', requireAdmin, async (req, res) => {
  notifyWriteQueue = notifyWriteQueue.then(() => {
    const all = readAllNotify().filter((s) => s.id !== req.params.id);
    fs.writeFileSync(NOTIFY_FILE, JSON.stringify(all, null, 2), 'utf8');
  });
  await notifyWriteQueue;
  res.json({ ok: true });
});

app.get('/api/admin/notify-signups/export.csv', requireAdmin, (req, res) => {
  const rows = readAllNotify();
  const esc = (v) => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  const header = ['createdAt', 'name', 'email'];
  const csv = [header.join(',')]
    .concat(rows.map((r) => header.map((h) => esc(r[h])).join(',')))
    .join('\r\n');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="klopjag-kaartjie-belangstelling.csv"');
  res.send(csv);
});

app.listen(PORT, () => {
  console.log(`[klopjag] site + archive API listening on http://localhost:${PORT}`);
});
