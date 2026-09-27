# Klopjag site — production bundle

This is a real, deployable version of the site (Afrikaans copy, same design as the
preview), wired to an actual backend so fan-submitted stories are saved for good —
not just previewed in a browser.

## What's in here

```
public/            the website itself (static files)
  index.html
  app.js
  admin.html        band-only archive view (not linked from the public site)
  images/           logo, album covers, and a handful of real photos
server/
  index.js          tiny Express server: serves public/ and the story API
  package.json
  .env.example      copy to .env and set a real ADMIN_KEY
  data/             stories.json lives here once the server has run
```

No build step, no framework, no database server to install. The story archive is a
JSON file on disk (`server/data/stories.json`) — plenty for years of fan submissions,
and easy to move to a real database later if it ever needs to (see "Growing out of
this" below).

## Running it locally

```
cd server
npm install
cp .env.example .env      # then edit .env and set ADMIN_KEY to something long and random
npm start
```

Open http://localhost:3000 — that's the site. Submit a story, then open
http://localhost:3000/admin.html and enter your ADMIN_KEY to see it in the archive.

## Putting it on klopjag.co.za

**If klopjag.co.za is on plain shared hosting with no Node support** (this is the
Afrihost case — checked via cPanel: no "Setup Node.js App" tool means no persistent
Node process), the site has to be split in two:

- **`public/`** (the actual website — HTML/CSS/JS/images) stays exactly where it is
  now, on the existing Afrihost shared hosting. No changes needed there — it's just
  static files, same as before.
- **`server/`** (the story-archive API) runs somewhere that *does* support Node —
  Render or Railway both have a free tier. Deploy just this folder as a "Web Service":
  connect the git repo Render/Railway builds from and set its **Root Directory** to
  `server` (if the repo holds this whole `production` folder), or push `server` as
  its own repo. Build command `npm install`, start command `npm start`. Set the
  `ADMIN_KEY` environment variable in their dashboard (see below), and add
  `ALLOWED_ORIGINS=https://klopjag.co.za,https://www.klopjag.co.za` too — that's what
  lets the site (on Afrihost) talk to the API (on Render/Railway) across domains; see
  `.env.example` for details. They'll give you a URL like
  `https://klopjag-api.onrender.com` (or point a custom domain/subdomain at it from
  their dashboard, e.g. `api.klopjag.co.za`, which needs a DNS record added in
  Afrihost's cPanel Zone Editor — they'll show you exactly what to add).
- Then open **`public/app.js`**, find `var API_BASE = '';` right near the top, and
  set it to that API URL (e.g. `var API_BASE = 'https://klopjag-api.onrender.com';`).
  Every API call in the file is already written to use `API_BASE + '/api/...'`, so
  that's the only line that needs to change. Re-upload `public/` to Afrihost after
  editing it.
- The band's `/admin.html` archive page now lives at the API's own URL (e.g.
  `https://klopjag-api.onrender.com/admin.html`), not on klopjag.co.za — bookmark
  that URL instead of the old one.

**If klopjag.co.za ever moves to a host that does support Node**, you don't need any
of the above — run this whole `production` folder there and skip straight to the
single-server setup below.

**Single-server setup** (only applies once the whole app — site + API — runs on one
Node host, e.g. a VPS, or a hosting plan that does support Node):

- **Render** or **Railway** — connect a git repo (or upload this folder), set the
  `ADMIN_KEY` environment variable in their dashboard, deploy. They give you a URL;
  point klopjag.co.za's DNS at it (they'll show you exactly how — usually a CNAME).
- **A basic VPS** (DigitalOcean, Hetzner, etc.) — install Node 18+, copy this
  `server` folder up, run `npm install && npm start` behind a process manager like
  `pm2`, and put Nginx or Caddy in front for HTTPS.

Whichever you pick, the only thing you must set is the `ADMIN_KEY` environment
variable — don't leave the default in place, since it protects every fan's
submitted story. Leave `ALLOWED_ORIGINS` and `public/app.js`'s `API_BASE` unset/empty
in this single-server setup — they're only needed for the split setup above.

## Adding real content

- **Songs, links and facts**: open `public/app.js`, find the `ALBUMS_FULL` array
  near the top — one entry per album, each with a `tracks` array. Set a track's
  `spotify` field to a real link (`null` shows as "voeg link by" on the site),
  its `apple` field for a real Apple Music link (a red "A" badge lights up once
  it's filled in), and its `fact` field to add a "story behind the song" — any
  track with a non-null `fact` automatically gets a "Storie" button on the site.
  Add Album 5's tracklist the same way, and its cover art and Discography entry
  appear automatically once `tracks` isn't empty.
- **Lyrics & chords**: set a track's `chords` field to a plain text block (chord
  line, then lyric line, repeat — see "Maak Gou" on *15de Laan* for a real
  example) and its "L" badge lights up the same way the Apple badge does,
  opening an inline chord sheet when clicked. Leave `chords` unset (or `null`)
  and the badge stays dashed/"kom binnekort" — same pattern as the other two
  badges, so there's nothing else to wire up per song.
- **Chord diagrams**: set a track's `chordsUsed` field to an array of chord
  names (e.g. `["G", "Em", "C", "D"]`) and they appear inside an "Akkoorde"
  card above that song's chord/lyric text — white background, black fretboard
  lines, so the same on-page SVGs double as print-ready art (see
  `chord-diagrams/` at the root of this bundle for standalone copies of the
  same four). The diagrams live in the `CHORD_DIAGRAMS` object just above
  `ALBUMS_FULL` in `public/app.js` — currently G, Em, C and D (open/first
  position). To add a new chord, generate another entry in that same shape
  (self-contained SVG, black lines/text, ember dots, chord name baked in as
  the SVG's own `<text>` — no separate HTML label needed) and reference its
  name from any song's `chordsUsed`.
- **Album-level Spotify link**: set `albumSpotify` on an album if you have one —
  it shows an "Album op Spotify" link next to that album's heading. Not required
  since every track already links out on its own.
- **Photos**: drop more images into `public/images/` and reference them in
  `public/index.html`'s gallery section (`<section id="stories">`). The original,
  much larger photo library is on your Mac in the "KLOPJAG STILLS" folder — this
  bundle only ships the dozen used on the live design.
- **Members / timeline**: also in `public/app.js` (`MEMBERS`, `TIMELINE` arrays).

## The story archive (and the 25th-show sing-along call-out)

- Fans submit through the form on the site. Each submission is validated,
  lightly rate-limited (max 8 per visitor per hour), and appended to
  `server/data/stories.json` with `status: "pending"`.
- The form's "Wat vir tipe bydrae is dit?" dropdown has a fifth option, "Ek
  wil saam sing by die 25 jaar show" — picking it swaps the textarea's label
  and reveals an extra "skakel na jou opname" field (a link to a YouTube/
  Google Drive/WhatsApp recording, since the site doesn't accept file
  uploads directly). This pairs with the "25 Jaar Show" call-out card above
  the song list, which links straight down to this form.
- **Nothing shows on the public page until a band member OKs it.** New
  submissions land in `/admin.html` as "Wag vir goedkeuring" (pending); only
  after clicking "OK" does an entry appear in the public archive-preview on
  the site itself (`GET /api/stories` only returns `status: "approved"`
  rows). "Herroep" un-approves an entry again if needed. This matters more
  now that some submissions carry a link to a fan's own video/audio — the
  band gets a look before anything goes public.
- The band reads, filters (by status and by type), approves, un-approves,
  deletes and exports (CSV, now including `status` and `link` columns) the
  full archive at `/admin.html`, behind the `ADMIN_KEY`. Pending entries
  float to the top of the table so nothing sits unnoticed. That page isn't
  linked from anywhere public — bookmark it.
- **Back up `server/data/stories.json` regularly** (it's the only copy of every
  story fans send in). Most hosts let you download files or attach persistent
  storage — check that your deploy target doesn't wipe the filesystem on every
  redeploy (some serverless platforms do; Render/Railway/a VPS with a persistent
  disk do not).

## The "25 Jaar Show" card: date/venue, ticket-notify signups, WhatsApp share

The call-out card above the song list (the one that also links to the
sing-along form above) now has three more things on it:

- **Date and venue**, as plain text: 2 February 2027, State Theatre in
  Pretoria, 15:00. It's hard-coded in `public/index.html` (the `.show-detail`
  line inside the `cta-card`) — if the date, time or venue ever changes,
  edit that one line.
- **"Laat weet my as die kaartjies beskikbaar is"** — a small name + email
  form. Submissions POST to `/api/notify-signup`, get validated (a real name,
  a plausible email) and lightly rate-limited the same way story submissions
  are, and are saved to `server/data/ticket-notify.json` (a duplicate email
  is silently skipped rather than saved twice). The band reads them and
  exports a CSV from `/admin.html` — a "Kaartjie-belangstelling" card there
  shows the running count and a "Laai CSV af" button, behind the same
  `ADMIN_KEY` as the story archive. **Back this file up alongside
  `stories.json`** — it's the only copy of everyone who asked to be notified.
- **Slack, optional**: set `SLACK_WEBHOOK_URL` in `.env` (see
  `.env.example` for how to create one — Slack's own "Incoming Webhooks"
  app, no coding on their end) and every signup also posts a one-line
  message to that Slack channel the moment it happens. Leave it unset and
  signups are still saved to the CSV — Slack is just a live heads-up on
  top, not the storage.
- **"Maak 'n blokbespreking vol" WhatsApp button** — opens
  `https://wa.me/?text=...` with a pre-filled message (the show date, venue,
  time and a link back to the site) so a fan can drop it straight into a
  WhatsApp group with friends. Built client-side in `public/app.js` (search
  for `wa-share-btn`) — nothing to configure, it just reads the page's own
  URL at click time.

## Growing out of this

If the archive gets big, gets hit by a lot of traffic at once (a viral post before
the 25th, say), or you want multiple people editing the same data at once, swap
`server/index.js`'s JSON-file functions (`readAll`, `appendStory`, `deleteStory`)
for calls to a real database (Postgres via Render/Railway's managed databases is
the easiest next step). The routes and the frontend don't need to change.

## What's still a placeholder

- **Album 5 (2007)** — its tracklist isn't confirmed yet, so it shows as
  "kom binnekort" in both the Speellys and the Discography grid. Once you have
  it, add it to the `ALBUMS_FULL` array in `public/app.js` (same shape as the
  other five albums) and it'll appear everywhere automatically.
- **Apple Music links** — all 70 confirmed songs have both a Spotify and an
  Apple Music link now. Two pairs of songs share what looks like a copy-pasted
  Apple Music URL ("Toe Dit Ek en Jy Was" / "Koeeldoppies en Half Kaal Vrouens"
  on *13/02*, and "Atlantis" / "Ice Scream en Vla" on *15de Laan*) — worth
  double-checking those four against the real links before launch.
- **Lyrics & chords** — one song ("Maak Gou", from *15de Laan*) has a real
  chord-and-lyric sheet wired up, with fretbox diagrams for G, Em, C and D
  above the text, as a working example. The other 69 have no `chords` field
  set yet and show the "L" badge as "kom binnekort". Send more chord sheets
  over any time and they'll go in the same way — only genuinely new chord
  shapes (not G/Em/C/D) need a new diagram added to `CHORD_DIAGRAMS`.
- **Print chord book** — the four chord diagrams also exist as standalone SVG
  files in `chord-diagrams/` at the root of this bundle, drawn clean and
  print-ready (black ink, no dark background) rather than styled for the
  site. Once more songs have chords transcribed, these are the starting point
  for a printed chord book for the February show — say the word when you're
  ready to move on that and we can lay out a print-ready booklet from the
  same underlying chord data.
- **Song stories** — two songs have real stories from the band ("Troos" and
  "'n Groot Idee Vir 'n Klein Dorpie"), which is why only those two show a
  "Storie" button on the site. The other 68 have no story text and
  intentionally show no button, rather than an empty one. Add more anytime by
  filling in a song's `fact` field in `public/app.js`.
- Album years and the awards/festival mentions come from the Wikipedia article
  John-Henry supplied — worth a final read-through by the band before launch.
- The etymology aside (klop + jag) tells the real story of how the band got
  its name (Klopdisselboom + die Makoujagters) — the literal dictionary
  meaning of "klopjag" (an old word for a police raid) was deliberately left
  out, given South Africa's history. Everything else written as prose (hero
  copy, section intros) is a first draft in Afrikaans with a bit of English
  slang mixed in, the way the brief asked — the band, as native speakers,
  should read it end
  to end.
