/**
 * StitchNXT static site build.
 *   npm run build        → writes the finished site to /dist
 *   SITE_URL=https://www.yourdomain.com npm run build
 * Output uses clean folder URLs (/features/ → dist/features/index.html).
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import site from './src/config/site.js';
import { layout } from './src/components/layout.js';
import home from './src/pages/home.js';
import features from './src/pages/features.js';
import solutions from './src/pages/solutions.js';
import tour from './src/pages/tour.js';
import about from './src/pages/about.js';
import contact from './src/pages/contact.js';
import { privacy, terms } from './src/pages/legal.js';
import notFound from './src/pages/notfound.js';
import pricing from './src/pages/pricing.js';
import { warnings as pricingWarnings, pendingReport } from './src/data/pricingModel.js';
import { warnings as clientWarnings, logoChecklist, stats as clientStats, hiddenCount } from './src/data/clientsModel.js';

const ROOT = import.meta.dirname;
const DIST = path.join(ROOT, 'dist');
const w = (file, data) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, data); };

fs.rmSync(DIST, { recursive: true, force: true });
fs.cpSync(path.join(ROOT, 'public'), DIST, { recursive: true });

/* ---------- favicon + social image, generated from the supplied logo ---------- */
const logo = path.join(ROOT, 'public/assets/stitchnxt-logo.png');
if (fs.existsSync(logo)) {
  const BEIGE = { r: 234, g: 230, b: 217, alpha: 1 };
  // The "S" mark occupies the left part of the logo; crop it and place on a square beige tile.
  const mark = await sharp(logo).extract({ left: 0, top: 0, width: 106, height: 86 }).toBuffer();
  const tile = (size) => sharp(mark).resize({ width: Math.round(size * 0.86), height: Math.round(size * 0.86), fit: 'inside', kernel: 'lanczos3' })
    .extend({ top: 0, bottom: 0, left: 0, right: 0, background: BEIGE }).toBuffer()
    .then((b) => sharp({ create: { width: size, height: size, channels: 4, background: BEIGE } }).composite([{ input: b, gravity: 'centre' }]).png().toBuffer());
  const brand = path.join(DIST, 'assets/branding');
  w(path.join(brand, 'favicon-32.png'), await tile(32));
  w(path.join(brand, 'favicon-192.png'), await tile(192));
  w(path.join(brand, 'apple-touch-icon.png'), await tile(180));
  // favicon.ico = a PNG-in-ICO container (48×48)
  const png48 = await tile(48);
  const hdr = Buffer.alloc(22);
  hdr.writeUInt16LE(0, 0); hdr.writeUInt16LE(1, 2); hdr.writeUInt16LE(1, 4);
  hdr[6] = 48; hdr[7] = 48; hdr.writeUInt16LE(1, 10); hdr.writeUInt16LE(32, 12);
  hdr.writeUInt32LE(png48.length, 14); hdr.writeUInt32LE(22, 18);
  w(path.join(DIST, 'favicon.ico'), Buffer.concat([hdr, png48]));
  // Open Graph image 1200×630
  const logoBig = await sharp(logo).resize({ width: 760, kernel: 'lanczos3' }).toBuffer();
  const lh = (await sharp(logoBig).metadata()).height;
  const bar = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect x="0" y="618" width="1200" height="12" fill="#BE0C0C"/></svg>`);
  w(path.join(brand, 'og-image.png'), await sharp({ create: { width: 1200, height: 630, channels: 4, background: BEIGE } })
    .composite([{ input: logoBig, left: 220, top: Math.round((630 - lh) / 2) }, { input: bar, left: 0, top: 0 }]).png().toBuffer());
} else console.warn('! public/assets/stitchnxt-logo.png missing — favicon/OG image skipped');

/* ---------- CSS + JS (minified when esbuild is available) ---------- */
let esbuild = null;
try { esbuild = await import('esbuild'); } catch { /* fall back to plain copy */ }
for (const [src, out, loader] of [['src/styles/main.css', 'assets/css/main.css', 'css'], ['src/scripts/main.js', 'assets/js/main.js', 'js']]) {
  const code = fs.readFileSync(path.join(ROOT, src), 'utf8');
  w(path.join(DIST, out), esbuild ? esbuild.transformSync(code, { loader, minify: true }).code : code);
}

/* ---------- pages ---------- */
const pages = [home(), features(), solutions(), tour(), about(), pricing(), contact(), privacy(), terms(), notFound()];
for (const p of pages) {
  const file = p.path === '/' ? 'index.html' : p.path.endsWith('.html') ? p.path.slice(1) : p.path.slice(1) + 'index.html';
  w(path.join(DIST, file), layout(p));
}

/* ---------- sitemap + robots ---------- */
const today = new Date().toISOString().slice(0, 10);
const indexable = pages.filter((p) => !p.noindex && !p.path.endsWith('.html'));
w(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${site.siteUrl}${p.path}</loc><lastmod>${today}</lastmod><priority>${p.path === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`);
w(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.siteUrl}/sitemap.xml\n`);

/* ---------- client data report + logo checklist ---------- */
const list = logoChecklist();
w(path.join(ROOT, 'clients-logo-checklist.txt'),
  'CLIENT LOGO CHECKLIST (rewritten on every build)\nSave each logo in public/assets/clients/ using the file name shown (.png, .jpg, .webp or .svg), then rebuild.\n\n' +
  list.map((b) => `${b.has ? '[x] have logo ' : '[ ] needed     '} ${b.slug}.png   ← ${b.name}${b.n > 1 ? ` (${b.n} outlets share it)` : ''}`).join('\n') + '\n');
console.log(`Clients: ${clientStats.clients} outlets · ${clientStats.cities} cities · ${clientStats.states} Indian states · ${clientStats.countries} countries${hiddenCount ? ` · ${hiddenCount} hidden` : ''} · logos found for ${list.filter((b) => b.has).length}/${list.length} brands`);
[...new Set(clientWarnings)].forEach((m) => console.warn('! ' + m));

pendingReport().forEach((m) => console.warn('! PRICING: ' + m));
[...new Set(pricingWarnings)].forEach((m) => console.warn('! PRICING: ' + m));
if (!site.pricingReviewed) console.warn('! PRICING page is in PREVIEW mode (noindex, not in sitemap). Set pricingReviewed: true in src/config/site.js when approved.');

console.log(`Built ${pages.length} pages → dist/ (${esbuild ? 'minified' : 'unminified'}) · siteUrl: ${site.siteUrl}`);
