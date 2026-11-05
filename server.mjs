// Small static server: precompressed assets, ETags, long-lived fonts, security headers.
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), 'dist');
const port = Number(process.env.PORT) || 8080;
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.png': 'image/png', '.txt': 'text/plain; charset=utf-8',
  '.mp4': 'video/mp4', '.webp': 'image/webp',
};
const security = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

async function isFile(p) {
  try { const s = await stat(p); return s.isFile() ? s : null; } catch { return null; }
}

createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD', ...security }).end();
    return;
  }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname); }
  catch { res.writeHead(400, security).end(); return; }

  if (pathname === '/healthz') { res.writeHead(200, { 'Content-Type': 'text/plain', ...security }).end('ok'); return; }

  const rel = normalize(pathname.endsWith('/') ? pathname + 'index.html' : pathname);
  const path = join(root, rel);
  if (!path.startsWith(root + sep)) { res.writeHead(403, security).end(); return; }

  const base = await isFile(path);
  if (!base) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', ...security }).end('Not found'); return; }

  const accept = String(req.headers['accept-encoding'] || '');
  let file = path, st = base, encoding = null;
  for (const [token, ext] of [['br', '.br'], ['gzip', '.gz']]) {
    if (accept.includes(token)) {
      const s = await isFile(path + ext);
      if (s) { file = path + ext; st = s; encoding = token; break; }
    }
  }

  const etag = `"${st.size.toString(16)}-${Math.floor(st.mtimeMs).toString(16)}"`;
  const headers = {
    'Content-Type': types[extname(path)] || 'application/octet-stream',
    'Cache-Control': extname(path) === '.woff2' ? 'public, max-age=31536000, immutable'
      : ['.mp4', '.webp'].includes(extname(path)) ? 'public, max-age=604800'
      : 'public, max-age=0, must-revalidate',
    'Accept-Ranges': 'bytes',
    ETag: etag,
    Vary: 'Accept-Encoding',
    ...security,
  };
  if (req.headers['if-none-match'] === etag) { res.writeHead(304, headers).end(); return; }
  if (encoding) headers['Content-Encoding'] = encoding;

  // Byte ranges: required for video seeking, and Safari won't play video without them.
  const range = !encoding && /^bytes=(\d*)-(\d*)$/.exec(String(req.headers.range || ''));
  if (range && (range[1] || range[2])) {
    let start = range[1] ? Number(range[1]) : Math.max(0, st.size - Number(range[2]));
    let end = range[1] && range[2] ? Math.min(Number(range[2]), st.size - 1) : st.size - 1;
    if (start > end || start >= st.size) {
      res.writeHead(416, { 'Content-Range': `bytes */${st.size}`, ...security }).end();
      return;
    }
    headers['Content-Range'] = `bytes ${start}-${end}/${st.size}`;
    headers['Content-Length'] = end - start + 1;
    res.writeHead(206, headers);
    if (req.method === 'HEAD') { res.end(); return; }
    createReadStream(file, { start, end }).on('error', () => res.destroy()).pipe(res);
    return;
  }
  headers['Content-Length'] = st.size;
  res.writeHead(200, headers);
  if (req.method === 'HEAD') { res.end(); return; }
  createReadStream(file).on('error', () => res.destroy()).pipe(res);
}).listen(port, () => console.log(`listening on :${port}`));
