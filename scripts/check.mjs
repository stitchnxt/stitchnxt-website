// QA: builds nothing — run `npm run build` first. Serves /dist, then checks every page in a real browser.
//  • console errors / failed requests   • horizontal overflow at several widths
//  • broken internal links and #anchors • images missing alt text, heading structure
// Optional: SHOTS=/some/dir node scripts/check.mjs  → saves full-page screenshots.
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const ROOT = path.resolve(import.meta.dirname, '..');
const PORT = 4199;
const srv = spawn('node', [path.join(ROOT, 'scripts/serve.mjs')], { env: { ...process.env, PORT }, stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
const base = `http://localhost:${PORT}`;
const pages = ['/', '/features/', '/solutions/', '/product-tour/', '/about/', '/contact/', '/privacy-policy/', '/terms-and-conditions/', '/404.html'];
const sizes = [['desktop', 1440, 900], ['laptop', 1100, 800], ['tablet', 820, 1100], ['mobile', 375, 812], ['small', 320, 700]];
const shots = process.env.SHOTS;
if (shots) fs.mkdirSync(shots, { recursive: true });
const problems = [];
const browser = await chromium.launch();

for (const [name, width, height] of sizes) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  for (const p of pages) {
    const page = await ctx.newPage();
    const errs = [];
    // External Google Fonts may be unreachable in offline/sandboxed test runs; that is not a site bug.
    page.on('console', (m) => { if (m.type() === 'error' && !/fonts\.g(oogleapis|static)|ERR_TUNNEL_CONNECTION_FAILED|ERR_NAME_NOT_RESOLVED|ERR_INTERNET_DISCONNECTED/.test(m.text())) errs.push(m.text()); });
    page.on('pageerror', (e) => errs.push(String(e)));
    page.on('requestfailed', (r) => { if (!/fonts\.g(oogleapis|static)|cdnjs\.cloudflare\.com|openstreetmap/.test(r.url())) errs.push('requestfailed ' + r.url()); });
    page.on('response', (r) => { if (r.status() >= 400 && !r.url().endsWith('/404.html') && p !== '/404.html') errs.push(r.status() + ' ' + r.url()); });
    await page.goto(base + p, { waitUntil: 'load' });
    await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-in')));
    await page.waitForTimeout(250);
    const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    if (o.sw > o.cw + 1) {
      const wide = await page.evaluate(() => [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > document.documentElement.clientWidth + 1).slice(0, 5).map((e) => e.tagName + '.' + e.className));
      problems.push(`[${name}] ${p} horizontal overflow ${o.sw}>${o.cw}: ${wide.join(', ')}`);
    }
    errs.forEach((e) => problems.push(`[${name}] ${p} ${e}`));
    if (shots && ['desktop', 'tablet', 'mobile'].includes(name)) await page.screenshot({ path: path.join(shots, `${name}-${p === '/' ? 'home' : p.replace(/\W+/g, '')}.png`), fullPage: true });
    await page.close();
  }
  await ctx.close();
}

/* static checks on the desktop DOM */
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const seen = new Set();
for (const p of pages) {
  const page = await ctx.newPage();
  await page.goto(base + p);
  const info = await page.evaluate(() => ({
    h1: document.querySelectorAll('h1').length,
    noAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
    title: document.title, desc: document.querySelector('meta[name=description]')?.content,
    canon: document.querySelector('link[rel=canonical]')?.href,
    links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
    ids: [...document.querySelectorAll('[id]')].map((e) => e.id),
  }));
  if (info.h1 !== 1) problems.push(`${p} has ${info.h1} <h1>`);
  if (info.noAlt) problems.push(`${p} has ${info.noAlt} images without alt`);
  if (seen.has(info.title)) problems.push(`${p} duplicate title`); seen.add(info.title);
  if (!info.desc || !info.canon) problems.push(`${p} missing description/canonical`);
  for (const h of info.links) {
    if (/^(https?:|mailto:|tel:)/.test(h)) continue;
    const [u, hash] = h.split('#');
    const target = u || p;
    const f = path.join(ROOT, 'dist', target.endsWith('/') ? target + 'index.html' : target);
    if (!fs.existsSync(f)) { problems.push(`${p} broken link ${h}`); continue; }
    if (hash) { const html = fs.readFileSync(f, 'utf8'); if (!html.includes(`id="${hash}"`)) problems.push(`${p} missing anchor ${h}`); }
  }
  await page.close();
}
await browser.close();
srv.kill();
if (problems.length) { console.log('PROBLEMS (' + problems.length + '):\n' + [...new Set(problems)].join('\n')); process.exitCode = 1; }
else console.log('All checks passed: ' + pages.length + ' pages × ' + sizes.length + ' viewports, no console errors, no overflow, no broken links.');
