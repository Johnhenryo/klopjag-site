(function () {
  // Backend API base URL. Leave empty ('') when the site and the API are served from the
  // same place (e.g. the old all-in-one Node server). Set it to the API's own URL (e.g.
  // 'https://klopjag-api.onrender.com') when the static site (this file) is hosted separately
  // from the backend (e.g. site on Afrihost, API on Render) - every fetch() below is prefixed
  // with this automatically, so this is the only line that needs to change.
  var API_BASE = '';
  var CHORD_DIAGRAMS = {"G": "<svg viewBox=\"0 0 120 150\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"G akkoord, oop posisie\"><text x=\"60\" y=\"16\" text-anchor=\"middle\" font-family=\"Georgia, 'Times New Roman', serif\" font-size=\"17\" font-weight=\"700\" fill=\"#161613\">G</text><line x1=\"20\" y1=\"40\" x2=\"100\" y2=\"40\" stroke=\"#161613\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"100\" y2=\"60\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"80\" x2=\"100\" y2=\"80\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"100\" x2=\"100\" y2=\"100\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"120\" x2=\"100\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"40\" x2=\"20\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"36\" y1=\"40\" x2=\"36\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"52\" y1=\"40\" x2=\"52\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"68\" y1=\"40\" x2=\"68\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"84\" y1=\"40\" x2=\"84\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"100\" y1=\"40\" x2=\"100\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><circle cx=\"20\" cy=\"90.0\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"36\" cy=\"70.0\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"52\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/><circle cx=\"68\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/><circle cx=\"84\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/><circle cx=\"100\" cy=\"90.0\" r=\"7\" fill=\"#b23a2f\"/></svg>", "Em": "<svg viewBox=\"0 0 120 150\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Em akkoord, oop posisie\"><text x=\"60\" y=\"16\" text-anchor=\"middle\" font-family=\"Georgia, 'Times New Roman', serif\" font-size=\"17\" font-weight=\"700\" fill=\"#161613\">Em</text><line x1=\"20\" y1=\"40\" x2=\"100\" y2=\"40\" stroke=\"#161613\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"100\" y2=\"60\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"80\" x2=\"100\" y2=\"80\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"100\" x2=\"100\" y2=\"100\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"120\" x2=\"100\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"40\" x2=\"20\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"36\" y1=\"40\" x2=\"36\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"52\" y1=\"40\" x2=\"52\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"68\" y1=\"40\" x2=\"68\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"84\" y1=\"40\" x2=\"84\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"100\" y1=\"40\" x2=\"100\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><circle cx=\"20\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/><circle cx=\"36\" cy=\"70.0\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"52\" cy=\"70.0\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"68\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/><circle cx=\"84\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/><circle cx=\"100\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/></svg>", "C": "<svg viewBox=\"0 0 120 150\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"C akkoord, oop posisie\"><text x=\"60\" y=\"16\" text-anchor=\"middle\" font-family=\"Georgia, 'Times New Roman', serif\" font-size=\"17\" font-weight=\"700\" fill=\"#161613\">C</text><line x1=\"20\" y1=\"40\" x2=\"100\" y2=\"40\" stroke=\"#161613\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"100\" y2=\"60\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"80\" x2=\"100\" y2=\"80\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"100\" x2=\"100\" y2=\"100\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"120\" x2=\"100\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"40\" x2=\"20\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"36\" y1=\"40\" x2=\"36\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"52\" y1=\"40\" x2=\"52\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"68\" y1=\"40\" x2=\"68\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"84\" y1=\"40\" x2=\"84\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"100\" y1=\"40\" x2=\"100\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><g stroke=\"#161613\" stroke-width=\"1.6\" stroke-linecap=\"round\"><line x1=\"15.5\" y1=\"20.5\" x2=\"24.5\" y2=\"29.5\"/><line x1=\"15.5\" y1=\"29.5\" x2=\"24.5\" y2=\"20.5\"/></g><circle cx=\"36\" cy=\"90.0\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"52\" cy=\"70.0\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"68\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/><circle cx=\"84\" cy=\"50.0\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"100\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/></svg>", "D": "<svg viewBox=\"0 0 120 150\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"D akkoord, oop posisie\"><text x=\"60\" y=\"16\" text-anchor=\"middle\" font-family=\"Georgia, 'Times New Roman', serif\" font-size=\"17\" font-weight=\"700\" fill=\"#161613\">D</text><line x1=\"20\" y1=\"40\" x2=\"100\" y2=\"40\" stroke=\"#161613\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"100\" y2=\"60\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"80\" x2=\"100\" y2=\"80\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"100\" x2=\"100\" y2=\"100\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"120\" x2=\"100\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"40\" x2=\"20\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"36\" y1=\"40\" x2=\"36\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"52\" y1=\"40\" x2=\"52\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"68\" y1=\"40\" x2=\"68\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"84\" y1=\"40\" x2=\"84\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"100\" y1=\"40\" x2=\"100\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><g stroke=\"#161613\" stroke-width=\"1.6\" stroke-linecap=\"round\"><line x1=\"15.5\" y1=\"20.5\" x2=\"24.5\" y2=\"29.5\"/><line x1=\"15.5\" y1=\"29.5\" x2=\"24.5\" y2=\"20.5\"/></g><g stroke=\"#161613\" stroke-width=\"1.6\" stroke-linecap=\"round\"><line x1=\"31.5\" y1=\"20.5\" x2=\"40.5\" y2=\"29.5\"/><line x1=\"31.5\" y1=\"29.5\" x2=\"40.5\" y2=\"20.5\"/></g><circle cx=\"52\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/><circle cx=\"68\" cy=\"70.0\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"84\" cy=\"90.0\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"100\" cy=\"70.0\" r=\"7\" fill=\"#b23a2f\"/></svg>", "E": "<svg viewBox=\"0 0 120 150\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"E akkoord\"><text x=\"60\" y=\"16\" text-anchor=\"middle\" font-family=\"Georgia, 'Times New Roman', serif\" font-size=\"17\" font-weight=\"700\" fill=\"#161613\">E</text><line x1=\"20\" y1=\"40\" x2=\"100\" y2=\"40\" stroke=\"#161613\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"100\" y2=\"60\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"80\" x2=\"100\" y2=\"80\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"100\" x2=\"100\" y2=\"100\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"120\" x2=\"100\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.55\"/><line x1=\"20\" y1=\"40\" x2=\"20\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"36\" y1=\"40\" x2=\"36\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"52\" y1=\"40\" x2=\"52\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"68\" y1=\"40\" x2=\"68\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"84\" y1=\"40\" x2=\"84\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"100\" y1=\"40\" x2=\"100\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><circle cx=\"20\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/><circle cx=\"36\" cy=\"70\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"52\" cy=\"70\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"68\" cy=\"50\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"84\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/><circle cx=\"100\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/></svg>", "E5": "<svg viewBox=\"0 0 120 270\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"E5 akkoord\"><text x=\"60\" y=\"16\" text-anchor=\"middle\" font-family=\"Georgia, 'Times New Roman', serif\" font-size=\"17\" font-weight=\"700\" fill=\"#161613\">E5</text><line x1=\"20\" y1=\"40\" x2=\"100\" y2=\"40\" stroke=\"#161613\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"100\" y2=\"60\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"80\" x2=\"100\" y2=\"80\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"100\" x2=\"100\" y2=\"100\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"120\" x2=\"100\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"140\" x2=\"100\" y2=\"140\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"160\" x2=\"100\" y2=\"160\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"180\" x2=\"100\" y2=\"180\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"200\" x2=\"100\" y2=\"200\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"220\" x2=\"100\" y2=\"220\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"240\" x2=\"100\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"40\" x2=\"20\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"36\" y1=\"40\" x2=\"36\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"52\" y1=\"40\" x2=\"52\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"68\" y1=\"40\" x2=\"68\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"84\" y1=\"40\" x2=\"84\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"100\" y1=\"40\" x2=\"100\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><text x=\"10\" y=\"54.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">1</text><text x=\"10\" y=\"94.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">3</text><text x=\"10\" y=\"134.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">5</text><text x=\"10\" y=\"174.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">7</text><text x=\"10\" y=\"214.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">9</text><g stroke=\"#161613\" stroke-width=\"1.6\" stroke-linecap=\"round\"><line x1=\"15.5\" y1=\"20.5\" x2=\"24.5\" y2=\"29.5\"/><line x1=\"15.5\" y1=\"29.5\" x2=\"24.5\" y2=\"20.5\"/></g><circle cx=\"36\" cy=\"170\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"52\" cy=\"210\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"68\" cy=\"210\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"84\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/><circle cx=\"100\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/></svg>", "Emaj7": "<svg viewBox=\"0 0 120 270\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Emaj7 akkoord\"><text x=\"60\" y=\"16\" text-anchor=\"middle\" font-family=\"Georgia, 'Times New Roman', serif\" font-size=\"17\" font-weight=\"700\" fill=\"#161613\">Emaj7</text><line x1=\"20\" y1=\"40\" x2=\"100\" y2=\"40\" stroke=\"#161613\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"100\" y2=\"60\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"80\" x2=\"100\" y2=\"80\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"100\" x2=\"100\" y2=\"100\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"120\" x2=\"100\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"140\" x2=\"100\" y2=\"140\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"160\" x2=\"100\" y2=\"160\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"180\" x2=\"100\" y2=\"180\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"200\" x2=\"100\" y2=\"200\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"220\" x2=\"100\" y2=\"220\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"240\" x2=\"100\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"40\" x2=\"20\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"36\" y1=\"40\" x2=\"36\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"52\" y1=\"40\" x2=\"52\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"68\" y1=\"40\" x2=\"68\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"84\" y1=\"40\" x2=\"84\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"100\" y1=\"40\" x2=\"100\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><text x=\"10\" y=\"54.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">1</text><text x=\"10\" y=\"94.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">3</text><text x=\"10\" y=\"134.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">5</text><text x=\"10\" y=\"174.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">7</text><text x=\"10\" y=\"214.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">9</text><g stroke=\"#161613\" stroke-width=\"1.6\" stroke-linecap=\"round\"><line x1=\"15.5\" y1=\"20.5\" x2=\"24.5\" y2=\"29.5\"/><line x1=\"15.5\" y1=\"29.5\" x2=\"24.5\" y2=\"20.5\"/></g><circle cx=\"36\" cy=\"170\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"52\" cy=\"210\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"68\" cy=\"190\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"84\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/><circle cx=\"100\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/></svg>", "C#m": "<svg viewBox=\"0 0 120 210\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"C#m akkoord\"><text x=\"60\" y=\"16\" text-anchor=\"middle\" font-family=\"Georgia, 'Times New Roman', serif\" font-size=\"17\" font-weight=\"700\" fill=\"#161613\">C#m</text><line x1=\"20\" y1=\"40\" x2=\"100\" y2=\"40\" stroke=\"#161613\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"100\" y2=\"60\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"80\" x2=\"100\" y2=\"80\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"100\" x2=\"100\" y2=\"100\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"120\" x2=\"100\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"140\" x2=\"100\" y2=\"140\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"160\" x2=\"100\" y2=\"160\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"180\" x2=\"100\" y2=\"180\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"40\" x2=\"20\" y2=\"180\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"36\" y1=\"40\" x2=\"36\" y2=\"180\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"52\" y1=\"40\" x2=\"52\" y2=\"180\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"68\" y1=\"40\" x2=\"68\" y2=\"180\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"84\" y1=\"40\" x2=\"84\" y2=\"180\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"100\" y1=\"40\" x2=\"100\" y2=\"180\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><text x=\"10\" y=\"54.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">1</text><text x=\"10\" y=\"94.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">3</text><text x=\"10\" y=\"134.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">5</text><text x=\"10\" y=\"174.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">7</text><g stroke=\"#161613\" stroke-width=\"1.6\" stroke-linecap=\"round\"><line x1=\"15.5\" y1=\"20.5\" x2=\"24.5\" y2=\"29.5\"/><line x1=\"15.5\" y1=\"29.5\" x2=\"24.5\" y2=\"20.5\"/></g><circle cx=\"36\" cy=\"110\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"52\" cy=\"150\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"68\" cy=\"150\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"84\" cy=\"130\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"100\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/></svg>", "Aadd9": "<svg viewBox=\"0 0 120 230\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Aadd9 akkoord\"><text x=\"60\" y=\"16\" text-anchor=\"middle\" font-family=\"Georgia, 'Times New Roman', serif\" font-size=\"17\" font-weight=\"700\" fill=\"#161613\">Aadd9</text><line x1=\"20\" y1=\"40\" x2=\"100\" y2=\"40\" stroke=\"#161613\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"100\" y2=\"60\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"80\" x2=\"100\" y2=\"80\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"100\" x2=\"100\" y2=\"100\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"120\" x2=\"100\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"140\" x2=\"100\" y2=\"140\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"160\" x2=\"100\" y2=\"160\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"180\" x2=\"100\" y2=\"180\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"200\" x2=\"100\" y2=\"200\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"40\" x2=\"20\" y2=\"200\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"36\" y1=\"40\" x2=\"36\" y2=\"200\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"52\" y1=\"40\" x2=\"52\" y2=\"200\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"68\" y1=\"40\" x2=\"68\" y2=\"200\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"84\" y1=\"40\" x2=\"84\" y2=\"200\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"100\" y1=\"40\" x2=\"100\" y2=\"200\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><text x=\"10\" y=\"54.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">1</text><text x=\"10\" y=\"94.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">3</text><text x=\"10\" y=\"134.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">5</text><text x=\"10\" y=\"174.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">7</text><circle cx=\"20\" cy=\"130\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"36\" cy=\"170\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"52\" cy=\"170\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"68\" cy=\"150\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"84\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/><circle cx=\"100\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/></svg>", "Badd11": "<svg viewBox=\"0 0 120 270\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Badd11 akkoord\"><text x=\"60\" y=\"16\" text-anchor=\"middle\" font-family=\"Georgia, 'Times New Roman', serif\" font-size=\"17\" font-weight=\"700\" fill=\"#161613\">Badd11</text><line x1=\"20\" y1=\"40\" x2=\"100\" y2=\"40\" stroke=\"#161613\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"100\" y2=\"60\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"80\" x2=\"100\" y2=\"80\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"100\" x2=\"100\" y2=\"100\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"120\" x2=\"100\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"140\" x2=\"100\" y2=\"140\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"160\" x2=\"100\" y2=\"160\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"180\" x2=\"100\" y2=\"180\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"200\" x2=\"100\" y2=\"200\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"220\" x2=\"100\" y2=\"220\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"240\" x2=\"100\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"40\" x2=\"20\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"36\" y1=\"40\" x2=\"36\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"52\" y1=\"40\" x2=\"52\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"68\" y1=\"40\" x2=\"68\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"84\" y1=\"40\" x2=\"84\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"100\" y1=\"40\" x2=\"100\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><text x=\"10\" y=\"54.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">1</text><text x=\"10\" y=\"94.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">3</text><text x=\"10\" y=\"134.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">5</text><text x=\"10\" y=\"174.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">7</text><text x=\"10\" y=\"214.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">9</text><circle cx=\"20\" cy=\"170\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"36\" cy=\"210\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"52\" cy=\"210\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"68\" cy=\"190\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"84\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/><circle cx=\"100\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/></svg>", "F#7add4": "<svg viewBox=\"0 0 120 170\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"F#7add4 akkoord\"><text x=\"60\" y=\"16\" text-anchor=\"middle\" font-family=\"Georgia, 'Times New Roman', serif\" font-size=\"17\" font-weight=\"700\" fill=\"#161613\">F#7add4</text><line x1=\"20\" y1=\"40\" x2=\"100\" y2=\"40\" stroke=\"#161613\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"100\" y2=\"60\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"80\" x2=\"100\" y2=\"80\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"100\" x2=\"100\" y2=\"100\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"120\" x2=\"100\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"140\" x2=\"100\" y2=\"140\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"40\" x2=\"20\" y2=\"140\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"36\" y1=\"40\" x2=\"36\" y2=\"140\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"52\" y1=\"40\" x2=\"52\" y2=\"140\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"68\" y1=\"40\" x2=\"68\" y2=\"140\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"84\" y1=\"40\" x2=\"84\" y2=\"140\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"100\" y1=\"40\" x2=\"100\" y2=\"140\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><text x=\"10\" y=\"54.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">1</text><text x=\"10\" y=\"94.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">3</text><text x=\"10\" y=\"134.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">5</text><circle cx=\"20\" cy=\"70\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"36\" cy=\"110\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"52\" cy=\"110\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"68\" cy=\"90\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"84\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/><circle cx=\"100\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/></svg>", "D6/9": "<svg viewBox=\"0 0 120 330\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"D6/9 akkoord\"><text x=\"60\" y=\"16\" text-anchor=\"middle\" font-family=\"Georgia, 'Times New Roman', serif\" font-size=\"17\" font-weight=\"700\" fill=\"#161613\">D6/9</text><line x1=\"20\" y1=\"40\" x2=\"100\" y2=\"40\" stroke=\"#161613\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"100\" y2=\"60\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"80\" x2=\"100\" y2=\"80\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"100\" x2=\"100\" y2=\"100\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"120\" x2=\"100\" y2=\"120\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"140\" x2=\"100\" y2=\"140\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"160\" x2=\"100\" y2=\"160\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"180\" x2=\"100\" y2=\"180\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"200\" x2=\"100\" y2=\"200\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"220\" x2=\"100\" y2=\"220\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"240\" x2=\"100\" y2=\"240\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"260\" x2=\"100\" y2=\"260\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"280\" x2=\"100\" y2=\"280\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"300\" x2=\"100\" y2=\"300\" stroke=\"#161613\" stroke-width=\"1.1\" opacity=\"0.5\"/><line x1=\"20\" y1=\"40\" x2=\"20\" y2=\"300\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"36\" y1=\"40\" x2=\"36\" y2=\"300\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"52\" y1=\"40\" x2=\"52\" y2=\"300\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"68\" y1=\"40\" x2=\"68\" y2=\"300\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"84\" y1=\"40\" x2=\"84\" y2=\"300\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><line x1=\"100\" y1=\"40\" x2=\"100\" y2=\"300\" stroke=\"#161613\" stroke-width=\"1.3\" opacity=\"0.85\"/><text x=\"10\" y=\"54.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">1</text><text x=\"10\" y=\"94.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">3</text><text x=\"10\" y=\"134.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">5</text><text x=\"10\" y=\"174.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">7</text><text x=\"10\" y=\"214.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">9</text><text x=\"10\" y=\"254.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">11</text><text x=\"10\" y=\"294.0\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"10.5\" fill=\"#161613\" opacity=\"0.65\">13</text><circle cx=\"20\" cy=\"230\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"36\" cy=\"270\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"52\" cy=\"270\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"68\" cy=\"250\" r=\"7\" fill=\"#b23a2f\"/><circle cx=\"84\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/><circle cx=\"100\" cy=\"25\" r=\"4.5\" fill=\"none\" stroke=\"#161613\" stroke-width=\"1.6\"/></svg>"};
    var ALBUMS_FULL = [{"name": "13/02", "year": "2002", "cover": "images/cov-1302.jpg", "albumSpotify": "https://open.spotify.com/album/4ztFX4dC5lnjweSUkdHpBy", "tracks": [{"title": "Weer en Weer", "spotify": "https://open.spotify.com/track/6irxw80vGeg1748oL4DSXX", "apple": "https://music.apple.com/us/song/weer-en-weer/1383554235", "fact": null}, {"title": "Stof", "spotify": "https://open.spotify.com/track/7bINfwrsTlxRFVdsYseZDg", "apple": "https://music.apple.com/us/song/stof/1383554236", "fact": null}, {"title": "Relatiwiteit", "spotify": "https://open.spotify.com/track/5JIUPQP8Ar1hAaw2IwHf5F", "apple": "https://music.apple.com/us/song/relatiwiteit/1383554237", "fact": null}, {"title": "Dalk 'n Boerseun", "spotify": "https://open.spotify.com/track/6TRlIEQKl9ROWAkQ85M4SH", "apple": "https://music.apple.com/us/song/dalk-n-boerseun/1383554238", "fact": null}, {"title": "Karloos in Arcadia", "spotify": "https://open.spotify.com/track/0tuWAw8AgCbb66T7Xy4HZW", "apple": "https://music.apple.com/us/song/karloos-in-arcadia/1383554239", "fact": null}, {"title": "24 Uur", "spotify": "https://open.spotify.com/track/0po6307uYYxbIInaAv9VZw", "apple": "https://music.apple.com/us/song/24-uur/1383554240", "fact": null}, {"title": "Die Kind", "spotify": "https://open.spotify.com/track/56PsZzYEVtKifCss0aSb0G", "apple": "https://music.apple.com/us/song/die-kind/1383554241", "fact": null}, {"title": "Die Randburg Tannie Blues", "spotify": "https://open.spotify.com/track/6mZVVeDyDXM1cWkryxG0ya", "apple": "https://music.apple.com/us/song/die-randburg-tannie-blues/1383554242", "fact": null}, {"title": "Toe Dit Ek en Jy Was", "spotify": "https://open.spotify.com/track/21VK3v8saZVs0YpIGHcbRF", "apple": "https://music.apple.com/us/song/toe-dit-ek-en-jy-was/1383554244", "fact": null}, {"title": "Koeeldoppies en Half Kaal Vrouens", "spotify": "https://open.spotify.com/track/0UmduVagw4hVUz5u3fnnGk", "apple": "https://music.apple.com/us/song/toe-dit-ek-en-jy-was/1383554244", "fact": null}]}, {"name": "15de Laan", "year": "2004", "cover": "images/cov-15delaan.jpg", "albumSpotify": "https://open.spotify.com/album/7n3EXCvr9lSwZyjUvvVJTi", "tracks": [{"title": "Stiltes", "spotify": "https://open.spotify.com/track/3fwr6BKqhr73zOFCpw9pAq", "apple": "https://music.apple.com/us/song/stiltes/267594772", "fact": null}, {"title": "Toer", "spotify": "https://open.spotify.com/track/0OEwskc2hlGvxdHuX27Oix", "apple": "https://music.apple.com/us/song/toer/267594854", "fact": null}, {"title": "Maak Gou", "spotify": "https://open.spotify.com/track/6IA0Sx4UeFSpJJYeotpcs2", "apple": "https://music.apple.com/us/song/maak-gou/267594900", "fact": "Maak gou is gebore in die Oos-Vrystaat nadat die band in Betlehem opgetree het. Tussen Fouriesburg, Clarence en Bethlehem is 'n pragtige plaas met vriendelike mense. Die \"Steyns\" was, en ís sekerlik steeds, lieflik!", "chordsUsed": ["G", "Em", "C", "D"], "chords": "G      Em       C          D\nKou solank die potlood\nWat ek vir jou gepos het\nSê groete vir Karen Zoid\nAs julle paaie dalk mag kruis\n\nEk stuur vir jou 'n draadblom@hotmail.com\n\nGelukkig gaan die tyd vir jou verby\nEn gelukkiger vir my\nLyk of ek dalk hierdie keer\nMy sin gaan kry\n\nWeet\nHierdie klopjag chords wat ek nou speel, hier\nHierdie E mineur, D, C en G\nGee ek vir jou\nSo maak\nMaak gou\n\nG      Em       C          D\nMaak gou ek wag vir jou\n\nG      Em       C          D\nMaak gou ek wag vir jou, maak gou\nMaak gou\n\nG      Em       C          D\nEn ek vra wat nou en jy praat te gou, want jy sê alweer jy mis my meer\nG      Em       C          D\nEn ek weet dis swaar, dis amper klaar, dis koud by jou maar ek mis jou nou\n\nG      Em       C          D\nSo maak gou ek wag vir jou\nG      Em       C          D\nMaak gou ek wag vir jou, maak gou\nMaak gou\n\nLaat weet my watter trein, watter dag, watter stasie en peron\nSommer die naam van die kondukteur ook net vir ingeval\nNet vir ingeval\n\nMaak gou ek wag vir jou\nMaak gou ek wag vir jou, maak gou\nMaak gou\n\nMaak gou ek wag vir jou\nMaak gou ek wag vir jou, maak gou", "storyBy": "John-Henry Opperman"}, {"title": "Die Storie Van Piet Vermaak", "spotify": "https://open.spotify.com/track/5Fv6MOXhoUyXcTvceR8H7c", "apple": "https://music.apple.com/us/song/die-storie-van-piet-vermaak/267595014", "fact": null}, {"title": "Exodus", "spotify": "https://open.spotify.com/track/6kBD1sZjp6mdl450ysqMhH", "apple": "https://music.apple.com/us/song/exodus/267595430", "fact": null}, {"title": "Wens Jy Wil", "spotify": "https://open.spotify.com/track/7GlmlgYVRVbpOleYBSADyY", "apple": "https://music.apple.com/us/song/wens-jy-wil/267595487", "fact": null}, {"title": "Liedjie Vir Die Besemtannie", "spotify": "https://open.spotify.com/track/3Q2srBbLCklVAlRIUAKKLI", "apple": "https://music.apple.com/us/song/liedjie-vir-die-besemtannie/267595622", "fact": null}, {"title": "N1 Roete", "spotify": "https://open.spotify.com/track/1Q8WbfPxJ4L6AtvvIOzXti", "apple": "https://music.apple.com/us/song/n1-roete/267595774", "fact": null}, {"title": "Vergeet", "spotify": "https://open.spotify.com/track/2m0uGf9btOiWXKlVlKOy7P", "apple": "https://music.apple.com/us/song/vergeet/267595969", "fact": null}, {"title": "Anton Pieter Gouws", "spotify": "https://open.spotify.com/track/0ZCtvUATUqiy99XUAQh9mH", "apple": "https://music.apple.com/us/song/anton-pieter-gouws/267596231", "fact": null}, {"title": "Atlantis", "spotify": "https://open.spotify.com/track/6NLY95TPG795Jed102LLOh", "apple": "https://music.apple.com/us/song/atlantis/267596402", "fact": null}, {"title": "Ice Scream en Vla", "spotify": "https://open.spotify.com/track/5LNwJADn08NFFnRWOvarXF", "apple": "https://music.apple.com/us/song/atlantis/267596402", "fact": null}]}, {"name": "Album Drie", "year": "2005", "cover": "images/cov-drie.jpg", "albumSpotify": null, "tracks": [{"title": "Gee", "spotify": "https://open.spotify.com/track/0u0aWtB1y4mJedIPPlrnaD", "apple": "https://music.apple.com/us/song/gee/267597258", "fact": null}, {"title": "300ste Maal", "spotify": "https://open.spotify.com/track/7vHnnJMbVTj9S6pKPQvzzk", "apple": "https://music.apple.com/us/song/300ste-maal/267597792", "fact": null}, {"title": "Vervang", "spotify": "https://open.spotify.com/track/4n7mo5YF7hT49ghO6wLqXf", "apple": "https://music.apple.com/us/song/vervang/267597872", "fact": null}, {"title": "Skree", "spotify": "https://open.spotify.com/track/0nrnO5EK6NLHUqfAesvjwV", "apple": "https://music.apple.com/us/song/skree/267598040", "fact": null}, {"title": "Nie Langer", "spotify": "https://open.spotify.com/track/2ux71KdgoFdS6uwIeupUtW", "apple": "https://music.apple.com/us/song/nie-langer/267598124", "fact": null}, {"title": "Rol Van Die Dice", "spotify": "https://open.spotify.com/track/1lOk19AVlSBscgnpSHNs40", "apple": "https://music.apple.com/us/song/rol-van-die-dice/267598196", "fact": null}, {"title": "Die Tekens", "spotify": "https://open.spotify.com/track/42CXyfjhY88ckfdAs6BU4L", "apple": "https://music.apple.com/us/song/die-tekens/267599007", "fact": null}, {"title": "Houtskool", "spotify": "https://open.spotify.com/track/3hj0USfcNYUcUG46ivhEhB", "apple": "https://music.apple.com/us/song/houtskool/267599945", "fact": null}, {"title": "Beloftes", "spotify": "https://open.spotify.com/track/7HfGX0O1BtKL88GmoRpOkz", "apple": "https://music.apple.com/us/song/beloftes/267600003", "fact": null}, {"title": "As Dit Reen", "spotify": "https://open.spotify.com/track/5AhJunW8VO7Y9kRB3an7qi", "apple": "https://music.apple.com/us/song/as-dit-reen/267600120", "fact": null}, {"title": "Val", "spotify": "https://open.spotify.com/track/26vN0BXOGqyEZzRQreOMPv", "apple": "https://music.apple.com/us/song/val/267600194", "fact": null}, {"title": "Te Veel", "spotify": "https://open.spotify.com/track/30eahFNCY9iu4rFSH2BLL4", "apple": "https://music.apple.com/us/song/te-veel/267600291", "fact": null}, {"title": "Boks", "spotify": "https://open.spotify.com/track/2YOXG3PUSlTRmkw5NvejX0", "apple": "https://music.apple.com/us/song/boks/267600441", "fact": null}, {"title": "Deel Twee", "spotify": "https://open.spotify.com/track/4ke1PGyHXFxi8gAMk0jZL6", "apple": "https://music.apple.com/us/song/deel-twee/267600721", "fact": null}, {"title": "Liesl", "spotify": "https://open.spotify.com/track/46oK7uFiDPQC8gisAS5c8j", "apple": "https://music.apple.com/us/song/liesl/267601057", "fact": null}, {"title": "Balans", "spotify": "https://open.spotify.com/track/2KhAbd5WOHdvAFocC6a25k", "apple": "https://music.apple.com/us/song/balans/267601144", "fact": null}, {"title": "Bel My", "spotify": "https://open.spotify.com/track/5JCbtX7AdGKfGO7PVHoZEt", "apple": "https://music.apple.com/us/song/bel-my/267601236", "fact": null}]}, {"name": "5", "year": "2007", "cover": "images/cov-5.jpg", "albumSpotify": null, "tracks": [{"title": "Dalk 'n Boerseun", "spotify": "https://open.spotify.com/track/1SGULSlQCNF40TmyfsdumM", "apple": "https://music.apple.com/us/song/dalk-n-boerseun/267596651", "fact": "Toe ek hierdie liedjie in 1999 geskryf het, was ek bang dit gaan vinnig dateer. Ek het nooit geweet dat iets wat waar is, mettertyd méér waar kan word nie. Ek dink dis belangriker as ooit om bewus te wees van hoe jy moet handel en wandel.", "storyBy": "John-Henry Opperman"}, {"title": "24 Uur", "spotify": "https://open.spotify.com/track/6MPI8Rd5DjxQtEBJEa0mje", "apple": "https://music.apple.com/us/song/24-uur/267596778", "fact": null}, {"title": "Toe Dit Ek En Jy Was", "spotify": "https://open.spotify.com/track/4DugMhXn7CjwzzyrjuAvYQ", "apple": "https://music.apple.com/us/song/toe-dit-ek-en-jy-was/267597078", "fact": null}, {"title": "Karloos in Arcadia", "spotify": "https://open.spotify.com/track/2ta7J3hBPFKMh5JisJx0Pj", "apple": "https://music.apple.com/us/song/karloos-in-arcadia/267597270", "fact": null}, {"title": "Stof", "spotify": "https://open.spotify.com/track/5Y7UugfVxkdBY5pS0JS7pf", "apple": "https://music.apple.com/us/song/stof/267597338", "fact": null}, {"title": "Wens Jy Wil", "spotify": "https://open.spotify.com/track/0BPs2wpONYieSVhnMOVoEe", "apple": "https://music.apple.com/us/song/wens-jy-wil/267597644", "fact": null}, {"title": "Liedjie Vir Die Besemtannie", "spotify": "https://open.spotify.com/track/6eQrgsAv76iLagyp9QNDrx", "apple": "https://music.apple.com/us/song/liedjie-vir-die-besemtannie/267597853", "fact": null}, {"title": "Vervang", "spotify": "https://open.spotify.com/track/3v0HIOSN1xK9vciK3pY2Ia", "apple": "https://music.apple.com/us/song/vervang/267597892", "fact": null}, {"title": "Boks", "spotify": "https://open.spotify.com/track/7hqR3IcmorqszuxC6pDwFJ", "apple": "https://music.apple.com/us/song/boks/267598051", "fact": null}, {"title": "Skree", "spotify": "https://open.spotify.com/track/7c2EkEAM01wMBka2IAzk8H", "apple": "https://music.apple.com/us/song/skree/267598121", "fact": null}, {"title": "Deel 2", "spotify": "https://open.spotify.com/track/0K2Zvwm3zt7WC0NtH3I598", "apple": "https://music.apple.com/us/song/deel-2/267598197", "fact": null}, {"title": "Houtskool", "spotify": "https://open.spotify.com/track/7qtboeqbFY5tPvOw9mpFEf", "apple": "https://music.apple.com/us/song/houtskool/267598938", "fact": null}, {"title": "Nie Langer", "spotify": "https://open.spotify.com/track/7GlWGRV8wVXztr4HAPqddA", "apple": "https://music.apple.com/us/song/nie-langer/267599558", "fact": null}]}, {"name": "Musiek Vir Die Agtergrond", "year": "2008", "cover": "images/cov-agtergrond.jpg", "albumSpotify": "https://open.spotify.com/album/6ILotPmtdtQdXbB7PfB5We", "tracks": [{"title": "Dans", "spotify": "https://open.spotify.com/track/72pRQeSBJ8hw7VMpX2OHGw", "apple": "https://music.apple.com/us/song/dans/1383412935", "fact": null}, {"title": "'n Groot Idee Vir 'n Klein Dorpie", "spotify": "https://open.spotify.com/track/3jS51IXNoyHlfSxzKQxbrX", "apple": "https://music.apple.com/us/song/n-groot-idee-vir-n-klein-dorpie/1383412936", "fact": null}, {"title": "Die Dinge Wat Jy Doen", "spotify": "https://open.spotify.com/track/6M4MvS692EiSyEYbDnaw1H", "apple": "https://music.apple.com/us/song/die-dinge-wat-jy-doen/1383412937", "fact": null}, {"title": "Gebed Vir 'n Rebel", "spotify": "https://open.spotify.com/track/5E0zH72xrZyBIrODBB0rxj", "apple": "https://music.apple.com/us/song/gebed-vir-n-rebel/1383412938", "fact": null}, {"title": "Na Die Wereld", "spotify": "https://open.spotify.com/track/0ezmKuADnLFmx7tISQkpeM", "apple": "https://music.apple.com/us/song/na-die-wereld/1383412939", "fact": null}, {"title": "Musiek Vir Die Agtergrond", "spotify": "https://open.spotify.com/track/643IwtG0X5Fc42VZrebLBH", "apple": "https://music.apple.com/us/song/musiek-vir-die-agtergrond/1383412940", "fact": null}, {"title": "Vergeet en Vergewe", "spotify": "https://open.spotify.com/track/4q4plkLAaW8DY6R4xwEvXT", "apple": "https://music.apple.com/us/song/vergeet-en-vergewe/1383412941", "fact": null}, {"title": "Al Jou Songs", "spotify": "https://open.spotify.com/track/3a2Nf4ehF3X8k8n2VvTBHR", "apple": "https://music.apple.com/us/song/al-jou-songs/1383412942", "fact": null}, {"title": "Troos", "spotify": "https://open.spotify.com/track/3LeIgNLGS7pXNQ6sNgRbuW", "apple": "https://music.apple.com/us/song/troos/1383412943", "fact": "Geskryf vir Beáte. Johnas se toe, meisie, vandag - vrou. Die liriek \"Liefde is twee kinders op 'n bus op pad êrens heen\" verwys na twee kinders - 'n boetie en 'n sussie wat saam met Johnas en Beáte op 'n bus vanaf Mosambiek, teruggery het Suid-Afrika toe. Die kinders was baie klein dalk, 4 en 6?. Sonder toesig het hulle die tog aangepak uit 'n situasie wat uiteraard nie vir opsies voorsiening gemaak het nie. \"Ek love nog altyd Daaf se solo in hierdie song en as ek dit hoor is ek weer op daai bus en sien daai kids\"", "chordsUsed": ["E5", "Emaj7", "C#m", "Aadd9", "Badd11", "E", "F#7add4", "D6/9"], "chords": "                E5       Emaj7\nEk kan jou nie troos nie\n\n                C#m\nEk kan net probeer\n\n                Aadd9\nEk weet jy moes ver loop\n\n                        E\nMet 'n padkaart vir hartseer\n\n\n\n                 E5       Emaj7\nEk kan jou nie troos nie\n\n                C#m\nEk kan net probeer\n\n                Aadd9\nMy woorde is wat dit is:\n\n                        E\nDis net woorde\n\n\n\n     Aadd9        Badd11          C#m   Badd11   Aadd9\nEn vanaand is 'n slegte tyd om alleen te wees\n    Aadd9        Badd11          C#m   F#7add4  Aadd9\nEn vanaand is 'n goeie tyd om 'n bietjie te vergeet\n    Badd11\nTe vergeet\n\n\n\n    E   Aadd9   Badd11\nSo sug en vee af jou trane\n\n    E               Aadd9     Badd11\nVan nou af sal dit net reën by jou\n\n                C#m\nOmdat jy so daarvan hou\n\n            Aadd9   Badd11\nSo daarvan hou\n\n\n\n                E5       Emaj7\nEk kan jou nie troos nie\n\n                C#m\nEk kan net probeer\n\n                Aadd9\nGif en genesing\n\n                        E\nKom uit dieselde angel\n\n\n                 E5       Emaj7\nEk kan jou nie troos nie\n\n                C#m\nMaar ek wil probeer\n\n                Aadd9\nEk's net 'n omstander\n\n                        E\nBy alles wat gebreek het hier\n\n\n\n     Aadd9        Badd11          C#m   Badd11   Aadd9\nEn vanaand is 'n slegte tyd om alleen te wees\n    Aadd9        Badd11          C#m   F#7add4  Aadd9\nEn vanaand is 'n goeie tyd om 'n bietjie te vergeet\n    Badd11\nTe vergeet\n\n\n\n    E   Aadd9   Badd11\nSo sug en vee af jou trane\n\n    E               Aadd9     Badd11\nVan nou af sal dit net reën by jou\n\n                C#m\nOmdat jy so daarvan hou\n\n            Aadd9   Badd11\nSo daarvan hou\n\n\nDaaf se Killer Solo!\n\n\n    E   Aadd9   Badd11\nSo sug en vee af jou trane\n\n    E               Aadd9     Badd11\nVan nou af sal dit net reën by jou\n\n                C#m\nOmdat jy so daarvan hou\n\n            Aadd9   Badd11\nSo daarvan hou\n\n\n    E           F#7add4        Aadd9           Badd11\nLiefde is 'n grenspos op 'n warm dag hier in Afrika\n\n    E           F#7add4        Aadd9           Badd11\nLiefde is twee kinders op 'n bus oppad êrens heen\n\n    E           F#7add4        Aadd9           Badd11\nLiefde is 'n foto van 'n reënboog in swart en wit\n\n\n    E              Aadd9     Badd11\nLiefde is iemand wat hoop en bid\n\n    D6/9\nEn glo en wens\n\nHy kan jou eendag\nVerdien", "storyBy": "John-Henry Opperman"}, {"title": "Miskien", "spotify": "https://open.spotify.com/track/2ghT43ObhA50V9nJXt2vFs", "apple": "https://music.apple.com/us/song/miskien/1383412944", "fact": null}, {"title": "All Along the Watchtower", "spotify": "https://open.spotify.com/track/6SAcqtOMEhX3wT9Wj5biCb", "apple": "https://music.apple.com/us/song/all-along-the-watchtower/1383412945", "fact": null}, {"title": "Alles Kom Terug", "spotify": "https://open.spotify.com/track/4arjNCguK4j2hdCztUXHEt", "apple": "https://music.apple.com/us/song/alles-kom-terug/1383412946", "fact": null}, {"title": "Rondom My", "spotify": "https://open.spotify.com/track/44gQkaTnUSNBAw6Az7AxOu", "apple": "https://music.apple.com/us/song/rondom-my/1383412947", "fact": null}, {"title": "Musiek Vir Die Agtergrond - Remix", "spotify": "https://open.spotify.com/track/1kxhjeoE3MB6awMM0Mw5a5", "apple": "https://music.apple.com/us/song/musiek-vir-die-agtergrond-remix/1383412948", "fact": null}]}, {"name": "09 (Live)", "year": "2009", "cover": "images/cov-09.jpg", "albumSpotify": null, "tracks": [{"title": "Miskien", "spotify": "https://open.spotify.com/track/2EZysMzwWS8GbQ4WnsGhjM", "apple": "https://music.apple.com/us/song/miskien/1383471116", "fact": null}, {"title": "Die Dinge Wat Jy Doen", "spotify": "https://open.spotify.com/track/5OmUjNPrtV9mE13T8ICvty", "apple": "https://music.apple.com/us/song/die-dinge-wat-jy-doen/1383471117", "fact": null}, {"title": "'n Groot Idee Vir 'n Klein Dorpie", "spotify": "https://open.spotify.com/track/0m8dZ6GoMFZ59cGNqUyzA8", "apple": "https://music.apple.com/us/song/n-groot-idee-vir-n-klein-dorpie/1383471118", "fact": "n Groot idee vir 'n klein dorpie is geskryf vir Herman, Johnas se beste pel van skool af. Herman en Johnas het met geboorte langs mekaar in die hospitaal gelê in Parys, waar Johnas gebore is nie. daar is 'n lyn in die liedjie \"Al die skoene wat jou weggee, sal my laat terugloop deur die vuurdoop.\" Herman het eenkeer sy skoene vir Johnas gegee by 'n busstop net voor hy op 'n bus geklim het uit Knysna uit, oppad terug Pretoria toe. Hoe Johnas kaalvoet by Interkaap aangekom het  kan niemand regtig onthou nie.", "storyBy": "John-Henry Opperman"}, {"title": "Dans", "spotify": "https://open.spotify.com/track/7tII2uf04XGtOe6UiwAR3f", "apple": "https://music.apple.com/us/song/dans/1383471119", "fact": null}, {"title": "Rondom My", "spotify": "https://open.spotify.com/track/2sIuRbmtj26KLvIgsHVoir", "apple": "https://music.apple.com/us/song/rondom-my/1383471120", "fact": null}, {"title": "Als Wat Jy Het", "spotify": "https://open.spotify.com/track/6JMaBFwPff4QbbJp4Ew0Lp", "apple": "https://music.apple.com/us/song/als-wat-jy-het/1383471121", "fact": null}, {"title": "Somer", "spotify": "https://open.spotify.com/track/6gUJVusWHFmNvmBs1qN627", "apple": "https://music.apple.com/us/song/somer/1383471122", "fact": null}, {"title": "Halleluja", "spotify": "https://open.spotify.com/track/6FNcvApECy101ycJe7lOwW", "apple": "https://music.apple.com/us/song/halleluja/1383471123", "fact": null}, {"title": "Liesl", "spotify": "https://open.spotify.com/track/43XFTLFbGGPek1uv2pOFfr", "apple": "https://music.apple.com/us/song/liesl/1383471124", "fact": null}, {"title": "Die Randburg Tannie Blues", "spotify": "https://open.spotify.com/track/1olKQ0n5F7CcKYeQwcUGC1", "apple": "https://music.apple.com/us/song/die-randburg-tannie-blues/1383471125", "fact": null}, {"title": "Alles Kom Terug", "spotify": "https://open.spotify.com/track/6EOYBAoEAuPvxsMn7aMhCo", "apple": "https://music.apple.com/us/song/alles-kom-terug/1383471126", "fact": null}, {"title": "Huistoe", "spotify": "https://open.spotify.com/track/39jSxsPntwt7J6U3vwXBS8", "apple": "https://music.apple.com/us/song/huistoe/1383471127", "fact": null}, {"title": "Musiek Vir Die Agtergrond", "spotify": "https://open.spotify.com/track/0DnRjcnmxZGp8v1qipwK9i", "apple": "https://music.apple.com/us/song/musiek-vir-die-agtergrond/1383471128", "fact": null}, {"title": "Na Die Wereld", "spotify": "https://open.spotify.com/track/2ruTUZ4qnN95C5fBiSe11X", "apple": "https://music.apple.com/us/song/na-die-wereld/1383471129", "fact": null}, {"title": "24 Uur", "spotify": "https://open.spotify.com/track/3Qe2lpn1h9h3tVlzFVFdsv", "apple": "https://music.apple.com/us/song/24-uur/1383471130", "fact": null}, {"title": "Gebed Vir 'n Rebel", "spotify": "https://open.spotify.com/track/0axXwKyuVkBBRJSumQZLd0", "apple": "https://music.apple.com/us/song/gebed-vir-n-rebel/1383471851", "fact": null}, {"title": "Dalk 'n Boerseun", "spotify": "https://open.spotify.com/track/4tIp92VvwYnIiXOsPqEQLy", "apple": "https://music.apple.com/us/song/dalk-n-boerseun/1383471852", "fact": null}]}];
  var MEMBERS = [
    { name: "John-Henry Opperman", role: "Lead- & Agtergrondsang, Kitare", photo: "images/member-john-henry.jpg" },
    { name: "Marie-Louise Diedericks", role: "Lead- & Agtergrondsang, Tjello, Klawerbord, Viool" },
    { name: "Salmon de Jager", role: "Lead- & Agtergrondsang, Kitare, Mondfluitjie" },
    { name: "Dawie de Jager", role: "Lead- & Agtergrondsang, Kitare" },
    { name: "Werner Griesel", role: "Tromme & Perkussie" },
    { name: "Morné Bam", role: "Bas" },
  ];
  var TIMELINE = [
    { year: "2002", tbd: false, title: "Die eerste show", text: "Klopjag speel op 13 Februarie hul heel eerste gig, in Pretoria. Debuutalbum 13/02 volg — later genomineer vir 'n “Geraas” Musiekprys." },
    { year: "2004", tbd: false, title: "15de Laan · groter word", text: "Tweede album 15de Laan word uitgereik. Michelle Ohlhoff en Miles Mulder sluit by die band aan." },
    { year: "2005", tbd: false, title: "Album Drie · Werner sluit aan", text: "Derde album is uit, en Werner Griesel sluit aan op tromme en perkussie." },
    { year: "2006", tbd: false, title: "Morné sluit aan", text: "Morné Bam sluit aan op bas, en rond die opstelling af wat vandag nog speel." },
    { year: "2007", tbd: false, title: "5 · groot fees-verhoë", text: "Vierde album 5 word uitgereik, saam met hoof-verhoog-slots by Aardklop en KKNK." },
    { year: "2008", tbd: false, title: "Musiek vir die Agtergrond", text: "Vyfde studio-album uitgereik — 'n SAMA-nominasie volg in 2009." },
    { year: "2009", tbd: false, title: "09 · die live album", text: "Klopjag reik 09 uit, live opgeneem." },
    { year: "?", tbd: true, title: "Die stories tussenin", text: "TV-verskynings, film-kameo's, die DVD's Aardklop (2007) en My Storie (2011) — die band se eie gunsteling-herinneringe hoort hier." },
    { year: "2024", tbd: false, title: "Steeds op pad", text: "Klopjag speel by Atterbury Teater, 4 Mei — “Ons was al by Sun City.”" },
    { year: "2027", tbd: false, title: "25 jaar", text: "13 Februarie — 'n kwarteeu sedert daai eerste show. Dis die datum waarvoor hierdie hele site aftel." },
  ];
  var CATS = ["'n Herinnering", "'n Fun fact", "Wat dit vir my beteken", "'n Boodskap aan die band"];

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }
  function text(tag, cls, str) { var e = document.createElement(tag); if (cls) e.className = cls; e.textContent = str; return e; }

  // ---- Chord hyperlinking: wrap chord-name tokens in the chords/lyrics text ----
  function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function buildChordsHtml(str, chordsUsed) {
    var esc = escapeHtml(str);
    var names = (chordsUsed || []).filter(function (n) { return !!CHORD_DIAGRAMS[n]; });
    if (!names.length) return esc;
    names.sort(function (a, b) { return b.length - a.length; });
    var pattern = names.map(function (n) { return n.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&'); }).join('|');
    var re = new RegExp('(?<![A-Za-z0-9#])(' + pattern + ')(?![A-Za-z0-9#/])', 'g');
    return esc.replace(re, function (m) { return '<span class="chord-tag" data-chord="' + m + '" tabindex="0">' + m + '</span>'; });
  }

  // ---- Chord hover popup: single shared floating element, event-delegated ----
  var chordPop = el('div', 'chord-pop');
  document.body.appendChild(chordPop);
  var chordPopOpen = false;
  function showChordPop(target, name) {
    if (!CHORD_DIAGRAMS[name]) return;
    chordPop.innerHTML = CHORD_DIAGRAMS[name];
    chordPop.style.display = 'block';
    var r = target.getBoundingClientRect();
    var pw = chordPop.offsetWidth || 96;
    var ph = chordPop.offsetHeight || 130;
    var left = r.left + r.width / 2 - pw / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
    var top = r.top - ph - 10;
    if (top < 8) { top = r.bottom + 10; }
    chordPop.style.left = left + 'px';
    chordPop.style.top = top + 'px';
    chordPopOpen = true;
  }
  function hideChordPop() { chordPop.style.display = 'none'; chordPopOpen = false; }
  document.addEventListener('mouseover', function (e) {
    var tag = e.target.closest && e.target.closest('.chord-tag');
    if (tag) showChordPop(tag, tag.getAttribute('data-chord'));
  });
  document.addEventListener('mouseout', function (e) {
    var tag = e.target.closest && e.target.closest('.chord-tag');
    if (tag && (!e.relatedTarget || !tag.contains(e.relatedTarget))) hideChordPop();
  });
  document.addEventListener('focusin', function (e) {
    var tag = e.target.closest && e.target.closest('.chord-tag');
    if (tag) showChordPop(tag, tag.getAttribute('data-chord'));
  });
  document.addEventListener('focusout', function (e) {
    var tag = e.target.closest && e.target.closest('.chord-tag');
    if (tag) hideChordPop();
  });
  document.addEventListener('click', function (e) {
    if (chordPopOpen && !e.target.closest('.chord-tag')) hideChordPop();
  });
  window.addEventListener('scroll', function () { if (chordPopOpen) hideChordPop(); }, { passive: true, capture: true });

  // ---- Songs, grouped by album ----
  var songList = document.getElementById('song-list');
  ALBUMS_FULL.forEach(function (album) {
    var group = el('div', 'album-group' + (album.tracks.length === 0 ? ' pending' : ''));
    var head = el('div', 'album-group-head');
    var headHtml =
      '<img src="' + album.cover + '" alt="' + album.name + ' omslag">' +
      '<div class="agi"><h3></h3><div class="agy mono">' + album.year + '</div></div>';
    if (album.albumSpotify) { headHtml += '<a class="alink" href="' + album.albumSpotify + '" target="_blank" rel="noopener">Album op Spotify →</a>'; }
    head.innerHTML = headHtml;
    head.querySelector('h3').textContent = album.name;
    group.appendChild(head);

    if (album.tracks.length === 0) {
      group.appendChild(text('div', 'album-pending-note', 'Speellys nog nie bevestig nie — kom binnekort.'));
    } else {
      album.tracks.forEach(function (t, idx) {
        var trackEl = el('div', 'track');
        var row = el('div', 'track-row');
        var num = (idx + 1 < 10 ? '0' : '') + (idx + 1);
        var actionsHtml = t.spotify
          ? '<a class="splink" href="' + t.spotify + '" target="_blank" rel="noopener">Spotify →</a>'
          : '<span class="splink tbd">voeg link by</span>';
        actionsHtml += t.apple
          ? '<a class="icon-chip live" href="' + t.apple + '" target="_blank" rel="noopener" title="Apple Music" aria-label="Apple Music">A</a>'
          : '<span class="icon-chip tbd" title="Apple Music: voeg link by" aria-label="Apple Music: voeg link by">A</span>';
        actionsHtml += t.chords
          ? '<button type="button" class="icon-chip live chords" title="Lirieke &amp; akkoorde" aria-label="Wys lirieke en akkoorde">L</button>'
          : '<span class="icon-chip tbd chords" title="Lirieke &amp; akkoorde — kom binnekort" aria-label="Lirieke en akkoorde, kom binnekort">L</span>';
        if (t.fact) { actionsHtml += '<button class="story-btn" type="button">Storie</button>'; }
        row.innerHTML = '<span class="tn mono">' + num + '</span><span class="tname"></span><div class="tactions">' + actionsHtml + '</div>';
        row.querySelector('.tname').textContent = t.title;
        trackEl.appendChild(row);
        if (t.fact) {
          var panel = el('div', 'story-panel');
          var inner = el('div', 'story-panel-inner');
          var p = document.createElement('p');
          p.textContent = t.fact;
          inner.appendChild(p);
          if (t.storyBy) {
            var isMember = MEMBERS.some(function (m) { return m.name === t.storyBy; });
            var byline = el('div', 'story-byline ' + (isMember ? 'band' : 'fan'));
            byline.textContent = t.storyBy + (isMember ? ' · Bandlid' : ' · Aanhanger-bydrae');
            inner.appendChild(byline);
          }
          panel.appendChild(inner);
          trackEl.appendChild(panel);
          row.querySelector('.story-btn').addEventListener('click', function () {
            var opening = !trackEl.classList.contains('open');
            trackEl.classList.toggle('open', opening);
            panel.style.maxHeight = opening ? (panel.scrollHeight + 'px') : '';
          });
        }
        if (t.chords) {
          var chordsPanel = el('div', 'chords-panel');
          var chordsInner = el('div', 'chords-panel-inner');
          if (t.chordsUsed && t.chordsUsed.length) {
            var diagSection = el('div', 'chords-diagram-section');
            var diagTitle = el('div', 'cd-section-title mono', 'Akkoorde');
            diagSection.appendChild(diagTitle);
            var diagRow = el('div', 'chord-diagrams-row');
            t.chordsUsed.forEach(function (cname) {
              if (!CHORD_DIAGRAMS[cname]) return;
              var card = el('div', 'chord-diagram-card', CHORD_DIAGRAMS[cname]);
              diagRow.appendChild(card);
            });
            diagSection.appendChild(diagRow);
            if (diagRow.children.length) { chordsInner.appendChild(diagSection); }
          }
          var pre = document.createElement('pre');
          pre.innerHTML = buildChordsHtml(t.chords, t.chordsUsed);
          chordsInner.appendChild(pre);
          chordsPanel.appendChild(chordsInner);
          trackEl.appendChild(chordsPanel);
          row.querySelector('.icon-chip.chords').addEventListener('click', function () {
            var opening = !trackEl.classList.contains('chords-open');
            trackEl.classList.toggle('chords-open', opening);
            chordsPanel.style.maxHeight = opening ? (chordsPanel.scrollHeight + 'px') : '';
          });
        }
        group.appendChild(trackEl);
      });
    }
    songList.appendChild(group);
  });

  // ---- Discography ----
  var discoGrid = document.getElementById('disco-grid');
  ALBUMS_FULL.forEach(function (a) {
    var link = a.albumSpotify || (a.tracks[0] && a.tracks[0].spotify) || null;
    var card = el('a', 'disco-card');
    card.href = link || '#discography';
    if (link) { card.target = '_blank'; card.rel = 'noopener'; } else { card.addEventListener('click', function (e) { e.preventDefault(); }); }
    card.innerHTML =
      '<div class="disco-cover"><img src="' + a.cover + '" alt="' + a.name + ' album-omslag" loading="lazy">' +
      '<div class="ov">' + (link ? 'Luister →' : 'Kom binnekort') + '</div></div>' +
      '<div class="disco-name">' + a.name + '</div><div class="disco-year mono">' + a.year + '</div>';
    discoGrid.appendChild(card);
  });

  // ---- Members ----
  var memberGrid = document.getElementById('member-grid');
  MEMBERS.forEach(function (m) {
    var card = el('div', 'member' + (m.photo ? ' has-photo' : ''));
    card.innerHTML = '<h3></h3><div class="role">' + m.role + '</div>';
    card.querySelector('h3').textContent = m.name;
    if (m.photo) {
      card.setAttribute('data-photo', m.photo);
      card.setAttribute('tabindex', '0');
    }
    memberGrid.appendChild(card);
  });

  // ---- Member hover popup: single shared floating element, event-delegated ----
  var memberPop = el('div', 'member-pop');
  var memberPopImg = document.createElement('img');
  memberPop.appendChild(memberPopImg);
  document.body.appendChild(memberPop);
  var memberPopOpen = false;
  function showMemberPop(target, src) {
    if (!src) return;
    memberPopImg.src = src;
    memberPop.style.display = 'block';
    var r = target.getBoundingClientRect();
    var pw = memberPop.offsetWidth || 150;
    var ph = memberPop.offsetHeight || 200;
    var left = r.left + r.width / 2 - pw / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
    var top = r.top - ph - 10;
    if (top < 8) { top = r.bottom + 10; }
    memberPop.style.left = left + 'px';
    memberPop.style.top = top + 'px';
    memberPopOpen = true;
  }
  function hideMemberPop() { memberPop.style.display = 'none'; memberPopOpen = false; }
  document.addEventListener('mouseover', function (e) {
    var card = e.target.closest && e.target.closest('.member.has-photo');
    if (card) showMemberPop(card, card.getAttribute('data-photo'));
  });
  document.addEventListener('mouseout', function (e) {
    var card = e.target.closest && e.target.closest('.member.has-photo');
    if (card && (!e.relatedTarget || !card.contains(e.relatedTarget))) hideMemberPop();
  });
  document.addEventListener('focusin', function (e) {
    var card = e.target.closest && e.target.closest('.member.has-photo');
    if (card) showMemberPop(card, card.getAttribute('data-photo'));
  });
  document.addEventListener('focusout', function (e) {
    var card = e.target.closest && e.target.closest('.member.has-photo');
    if (card) hideMemberPop();
  });
  document.addEventListener('click', function (e) {
    if (memberPopOpen && !e.target.closest('.member.has-photo')) hideMemberPop();
  });
  window.addEventListener('scroll', function () { if (memberPopOpen) hideMemberPop(); }, { passive: true, capture: true });

  // ---- Timeline ----
  var tlList = document.getElementById('timeline-list');
  TIMELINE.forEach(function (t) {
    var item = el('div', 'tl-item' + (t.tbd ? ' tbd' : ''));
    item.innerHTML = '<div class="tl-year mono">' + t.year + (t.tbd ? '<span class="tag-tbd">band moet byvoeg</span>' : '') + '</div><h4></h4><p></p>';
    item.querySelector('h4').textContent = t.title;
    item.querySelector('p').textContent = t.text;
    tlList.appendChild(item);
  });

  // ---- Song select in the story form, grouped by album ----
  var songSelect = document.getElementById('f-song');
  ALBUMS_FULL.forEach(function (a) {
    if (a.tracks.length === 0) return;
    var og = document.createElement('optgroup'); og.label = a.name;
    a.tracks.forEach(function (t) { var o = el('option'); o.value = t.title; o.textContent = t.title; og.appendChild(o); });
    songSelect.appendChild(og);
  });

  // ---- Story form: category-dependent field (sing-along link) ----
  var SING_ALONG_CATEGORY = 'Ek wil saam sing by die 25 jaar show';
  var catSelect = document.getElementById('f-cat');
  var linkWrap = document.getElementById('f-link-wrap');
  var textLabel = document.getElementById('f-text-label');
  var textArea = document.getElementById('f-text');
  function updateFormForCategory() {
    var isSingAlong = catSelect.value === SING_ALONG_CATEGORY;
    linkWrap.hidden = !isSingAlong;
    if (isSingAlong) {
      textLabel.textContent = 'Vertel ons van jouself';
      textArea.placeholder = "Wie is jy, en hoekom hierdie liedjie? ('n skakel na 'n opname help ook geweldig)";
    } else {
      textLabel.textContent = 'Jou storie';
      textArea.placeholder = 'Vat jou tyd...';
    }
  }
  catSelect.addEventListener('change', updateFormForCategory);
  updateFormForCategory();

  // ---- Story form: venue-dependent field ("Ander plek") ----
  var venueSelect = document.getElementById('f-venue');
  var venueOtherWrap = document.getElementById('f-venue-other-wrap');
  function updateFormForVenue() { venueOtherWrap.hidden = venueSelect.value !== '__other__'; }
  venueSelect.addEventListener('change', updateFormForVenue);
  updateFormForVenue();

  // ---- 25 Jaar Show card: WhatsApp share link ----
  var waBtn = document.getElementById('wa-share-btn');
  if (waBtn) {
    var waMsg = "Klopjag se 25 jaar-show is op pad! 2 Februarie 2027, State Theatre in Pretoria, 15:00. Kom ons maak 'n blokbespreking vol — " + window.location.href;
    waBtn.href = 'https://wa.me/?text=' + encodeURIComponent(waMsg);
  }

  // ---- 25 Jaar Show card: "laat weet my as kaartjies beskikbaar is" signup ----
  var notifyForm = document.getElementById('notify-form');
  if (notifyForm) {
    notifyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('notify-msg');
      var payload = {
        name: document.getElementById('notify-name').value.trim(),
        email: document.getElementById('notify-email').value.trim(),
      };
      if (!payload.name || !payload.email) return;
      var btn = notifyForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      fetch(API_BASE + '/api/notify-signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { return r.json().then(function (data) { return { ok: r.ok, data: data }; }); })
        .then(function (res) {
          btn.disabled = false;
          msg.hidden = false;
          if (!res.ok) {
            msg.className = 'notify-msg err';
            msg.textContent = (res.data && res.data.error) || 'Iets het skeefgeloop — probeer weer.';
            return;
          }
          msg.className = 'notify-msg ok';
          msg.textContent = 'Dankie, ' + payload.name + '! Ons laat jou weet sodra kaartjies beskikbaar is.';
          notifyForm.reset();
        })
        .catch(function () {
          btn.disabled = false;
          msg.hidden = false;
          msg.className = 'notify-msg err';
          msg.textContent = 'Kon nie koppel nie — probeer weer.';
        });
    });
  }

  // ---- Archive: load recent (approved) stories from the API, render safely (textContent, no innerHTML of user text) ----
  var storyListEl = document.getElementById('story-list');
  function renderStories(list) {
    storyListEl.innerHTML = '';
    if (!list || list.length === 0) {
      storyListEl.appendChild(text('p', null, 'Nog geen stories nie — wees die eerste om een te stuur.'));
      storyListEl.firstChild.style.cssText = 'color:var(--muted);font-size:.9rem;margin:0;';
      return;
    }
    list.forEach(function (s) {
      var e = el('div', 'story-entry');
      var metaBits = [s.category, s.song];
      if (s.venue) metaBits.push(s.venue);
      if (s.when) metaBits.push(s.when);
      var meta = text('div', 'meta', metaBits.join(' · '));
      var p = document.createElement('p');
      p.appendChild(document.createTextNode(s.text + ' '));
      if (s.link) {
        var a = document.createElement('a');
        a.href = s.link; a.target = '_blank'; a.rel = 'noopener';
        a.textContent = 'opname →';
        p.appendChild(a);
        p.appendChild(document.createTextNode(' '));
      }
      var who = text('span', null, '— ' + (s.name || 'Anoniem'));
      who.style.cssText = 'color:var(--muted);font-style:italic;';
      p.appendChild(who);
      e.appendChild(meta); e.appendChild(p);
      storyListEl.appendChild(e);
    });
  }
  function loadStories() {
    fetch(API_BASE + '/api/stories?limit=20').then(function (r) { return r.json(); }).then(renderStories).catch(function () {
      storyListEl.textContent = 'Kon nie stories laai nie — probeer weer later.';
    });
  }
  loadStories();

  document.getElementById('story-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var status = document.getElementById('form-status');
    var venueVal = document.getElementById('f-venue').value;
    var venueOther = document.getElementById('f-venue-other').value.trim();
    var venue = venueVal === '__other__' ? venueOther : (venueVal === '__unsure__' || !venueVal ? '' : venueVal);
    var payload = {
      name: document.getElementById('f-name').value.trim(),
      contact: document.getElementById('f-contact').value.trim(),
      song: document.getElementById('f-song').value,
      category: document.getElementById('f-cat').value,
      venue: venue,
      when: document.getElementById('f-when').value.trim(),
      text: document.getElementById('f-text').value.trim(),
      link: document.getElementById('f-link').value.trim(),
    };
    if (!payload.text) return;
    var btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    fetch(API_BASE + '/api/stories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().then(function (data) { return { ok: r.ok, data: data }; }); })
      .then(function (res) {
        btn.disabled = false;
        if (!res.ok) {
          status.textContent = res.data.error || 'Iets het skeefgeloop — probeer weer.';
          status.className = 'form-status err';
          return;
        }
        e.target.reset();
        updateFormForCategory();
        updateFormForVenue();
        status.textContent = 'Gestuur — dankie! Dit gaan reguit na die band se argief.';
        status.className = 'form-status ok';
        loadStories();
        setTimeout(function () { status.textContent = ''; }, 5000);
      })
      .catch(function () {
        btn.disabled = false;
        status.textContent = 'Kon nie stuur nie — gaan jou internet-verbinding na en probeer weer.';
        status.className = 'form-status err';
      });
  });

  // ---- Sticky player: full speellys, grouped by album ----
  var player = document.getElementById('player');
  var panel = document.getElementById('player-panel');
  var totalTracks = 0, tracksWithLinks = 0;
  ALBUMS_FULL.forEach(function (a) {
    if (a.tracks.length === 0) return;
    panel.appendChild(text('div', 'player-group-head', a.name));
    a.tracks.forEach(function (t) {
      totalTracks++;
      if (t.spotify) tracksWithLinks++;
      var row = el('a', 'player-song');
      row.href = t.spotify || '#songs';
      if (t.spotify) { row.target = '_blank'; row.rel = 'noopener'; } else { row.addEventListener('click', function (e) { e.preventDefault(); window.location.hash = 'songs'; }); }
      row.innerHTML = '<div class="sw" style="background-image:url(\'' + a.cover + '\')"></div><div class="nm"></div><div class="pl">' + (t.spotify ? 'Spotify' : 'Voeg link by') + '</div>';
      row.querySelector('.nm').textContent = t.title;
      panel.appendChild(row);
    });
  });
  var playerSub = document.getElementById('player-sub');
  if (playerSub) playerSub.textContent = totalTracks + ' liedjies · ' + tracksWithLinks + ' met Spotify-links';
  document.getElementById('player-toggle').addEventListener('click', function () {
    var open = player.classList.toggle('open');
    document.getElementById('player-toggle-label').textContent = open ? 'Toe' : 'Oop';
  });

  // ---- Countdown ----
  function updateCountdown() {
    var target = new Date('2027-02-13T00:00:00+02:00');
    var now = new Date();
    var days = Math.max(0, Math.ceil((target - now) / 86400000));
    document.getElementById('cd-days').textContent = days.toLocaleString();
  }
  updateCountdown();

  // ---- Hero: "amper" drops off the headline from 2 Feb 2027 ----
  function updateAmper(){
    var amperGoesAway = new Date('2027-02-02T00:00:00+02:00');
    var amperEl = document.getElementById('amper');
    if(amperEl && new Date() >= amperGoesAway){ amperEl.remove(); }
  }
  updateAmper();
})();
