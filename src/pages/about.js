import { icon, esc } from '../components/ui.js';
import { pageHero, finalCta } from '../components/sections.js';

/**
 * ABOUT PAGE — keep it factual. Do not add founder details, history, years,
 * customer numbers or awards unless they are confirmed.
 */
export default function aboutPage() {
  const pillars = [
    ['LuScissors', 'Tailoring', 'Customer measurements, tailoring orders, workshop work and deliveries.'],
    ['LuBoxes', 'Fabric & Garments', 'Purchases, inventory, barcode printing and sales invoicing.'],
    ['LuLandmark', 'Accounts', 'Customer receivables, supplier payables and account ledgers.'],
  ];
  return {
    path: '/about/',
    title: 'About StitchNXT – Management Software for Tailoring, Fabric & Garment Shops',
    description: 'StitchNXT is an integrated Windows desktop application that brings tailoring, fabric, garment, inventory, billing and accounts management together.',
    body: [
      pageHero({ eyebrow: 'About Us', title: 'Technology Designed <span class="accent">Around Your Business.</span>', text: 'An integrated Windows desktop application for tailoring, fabric and garment businesses.' }),
      `<section class="section"><div class="container container--narrow prose" data-reveal>
        <p>Businesses in the tailoring, fabric and garment industry have unique operational requirements. StitchNXT is developed to bring important business activities together in one integrated desktop application.</p>
        <p>From customer measurements and tailoring orders to inventory, billing and accounts, StitchNXT aims to simplify the everyday management of these businesses.</p>
      </div></section>`,
      `<section class="section section--beige"><div class="container">
        <div class="grid grid--3">${pillars.map(([i, t, d]) => `<article class="why-card" data-reveal><span class="why-card__ico">${icon(i, 26)}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('')}</div>
        <p class="center-note" data-reveal><strong>Windows desktop software.</strong> StitchNXT is installed on your Windows computer. It is not a cloud-based, browser-based or mobile application.</p>
      </div></section>`,
      finalCta({ title: 'Let’s Talk About <span class="accent-light">Your Shop.</span>', text: 'Tell us about your business and request a demonstration of StitchNXT.' }),
    ].join('\n'),
  };
}
