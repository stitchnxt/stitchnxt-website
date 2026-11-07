import { categories, features, featureBySlug } from '../content/features.js';
import { esc, icon, demoBtn, btn, shotWindow } from '../components/ui.js';
import { pageHero, finalCta } from '../components/sections.js';

const bg = ['', 'section--beige', '', 'section--beige'];

function featureRow(f, n) {
  const rel = f.related
    .map((s) => featureBySlug[s])
    .filter(Boolean)
    .map((r) => `<a href="#${r.slug}">${esc(r.title)}</a>`)
    .join('');
  return `<article class="feature-row${n % 2 ? ' is-reverse' : ''}" id="${f.slug}">
    <div class="feature-row__copy" data-reveal>
      <span class="feature-row__ico">${icon(f.icon, 28)}</span>
      <h3>${esc(f.title)}</h3>
      <p>${esc(f.desc)}</p>
      <p class="benefit"><strong>Business benefit</strong> ${esc(f.benefit)}</p>
      ${rel ? `<p class="related"><span>Related:</span> ${rel}</p>` : ''}
      <div class="btn-row">${demoBtn('Request a Demo', { size: 'sm' })}</div>
    </div>
    <div class="feature-row__media">${shotWindow(f.shot, { caption: f.title })}</div>
  </article>`;
}

export default function featuresPage() {
  const nav = categories.map((c) => `<a class="chip" href="#${c.id}">${icon(c.icon, 16)} ${esc(c.title)}</a>`).join('');
  const sections = categories.map((c, i) => {
    const list = features.filter((f) => f.category === c.id);
    return `<section class="section ${bg[i % 4]}" id="${c.id}" aria-labelledby="${c.id}-title">
  <div class="container">
    <div class="cat-head" data-reveal>
      <span class="cat-head__ico">${icon(c.icon, 30)}</span>
      <div><h2 id="${c.id}-title">${esc(c.title)}</h2><p>${esc(c.blurb)}</p></div>
    </div>
    <div class="feature-rows">${list.map(featureRow).join('')}</div>
  </div>
</section>`;
  });
  return {
    path: '/features/',
    title: 'Features – Tailoring Billing, Measurements, Workshop & Inventory Software | StitchNXT',
    description: 'Explore StitchNXT features: tailoring invoices, customer measurements, workshop issue and inward, fabric and garment inventory, barcode printing and account ledgers.',
    body: [
      pageHero({ eyebrow: 'Features', title: 'Every Tool Your <span class="accent">Shop</span> Needs, in One Application.', text: 'StitchNXT is Windows desktop software that brings tailoring, customer management, fabric and garment management and accounts together.', actions: demoBtn('Request a Demo', { size: 'lg' }) + btn('View Product Tour', '/product-tour/', 'secondary', { size: 'lg' }) }),
      `<nav class="subnav" aria-label="Feature categories"><div class="container subnav__inner">${nav}</div></nav>`,
      ...sections,
      finalCta(),
    ].join('\n'),
  };
}
