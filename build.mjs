// Prerenders the English page and precompresses every text asset. No dependencies.
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { brotliCompressSync, gzipSync, constants } from 'node:zlib';
import { renderPage } from './src/render.js';
import content from './src/content.js';

const dist = 'dist';
await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, 'assets'), { recursive: true });
await cp('public', dist, { recursive: true });
for (const f of await readdir('src')) {
  if (f === 'template.html') continue;
  await cp(join('src', f), join(dist, 'assets', f));
}

const template = await readFile('src/template.html', 'utf8');
await writeFile(join(dist, 'index.html'), template.replace('<!--page-->', renderPage('en')));

const compressible = new Set(['.html', '.js', '.css', '.svg', '.json']);
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (compressible.has(extname(p))) {
      const buf = await readFile(p);
      await writeFile(p + '.br', brotliCompressSync(buf, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }));
      await writeFile(p + '.gz', gzipSync(buf, { level: 9 }));
    }
  }
}
await walk(dist);
const size = (await stat(join(dist, 'index.html'))).size;
console.log(`built dist/ (${Object.keys(content.i18n).length} locales, index.html ${size} bytes)`);
