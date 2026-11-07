import { solutions } from '../content/solutions.js';
import { esc, icon, demoBtn, btn, checkList, shotWindow } from '../components/ui.js';
import { pageHero, finalCta } from '../components/sections.js';

export default function solutionsPage() {
  const nav = solutions.map((s) => `<a class="chip" href="#${s.id}">${icon(s.icon, 16)} ${esc(s.label)}</a>`).join('');
  const sections = solutions.map((s, i) => `<section class="section ${i % 2 ? 'section--beige' : ''}" id="${s.id}" aria-labelledby="${s.id}-title">
  <div class="container">
    <div class="split ${i % 2 ? 'split--reverse' : ''}">
      <div class="split__copy" data-reveal>
        <p class="eyebrow">${icon(s.icon, 16)} ${esc(s.label)}</p>
        <h2 id="${s.id}-title">${s.headline}</h2>
        <p class="lead">${esc(s.intro)}</p>
        <div class="two-col">
          <div><h3 class="mini-title">Business requirements</h3>${checkList(s.needs)}</div>
          <div><h3 class="mini-title">Relevant StitchNXT features</h3>${checkList(s.features)}</div>
        </div>
        <h3 class="mini-title">Benefits</h3>
        ${checkList(s.benefits)}
        <div class="btn-row">${demoBtn('Request a Demo')}${btn('View All Features', '/features/', 'secondary')}</div>
      </div>
      <div class="split__media">${shotWindow(s.shot, { caption: s.label })}</div>
    </div>
  </div>
</section>`);
  return {
    path: '/solutions/',
    title: 'Solutions – Tailoring, Fabric & Garment Shop Software | StitchNXT',
    description: 'StitchNXT solutions for tailoring shops, fabric shops, garment shops and combined businesses: billing, inventory, measurements, workshop tracking and accounts.',
    body: [
      pageHero({ eyebrow: 'Solutions', title: 'Software for <span class="accent">Your Kind</span> of Shop.', text: 'Whether you stitch, sell fabric, sell garments or do all three, StitchNXT is built around how these businesses work.', actions: demoBtn('Request a Demo', { size: 'lg' }) }),
      `<nav class="subnav" aria-label="Solutions"><div class="container subnav__inner">${nav}</div></nav>`,
      ...sections,
      finalCta(),
    ].join('\n'),
  };
}
