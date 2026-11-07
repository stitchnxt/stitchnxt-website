/** Reusable page sections (homepage + inner pages). All marketing copy is editable below. */
import { esc, icon, btn, demoBtn, sectionHead, shotInner, shotWindow, shotByCategory, checkList, DEMO_URL, whatsappUrl } from './ui.js';
import { homeGroups } from '../content/features.js';
import { screenshots, shotCategories } from '../content/screenshots.js';
import { faqs } from '../content/faq.js';

/* ------------------------------------------------------------------ HERO */
export function hero() {
  const dash = shotByCategory('dashboard');
  const hasReal = dash && dash.file && shotInner(dash).startsWith('<img');
  const screen = hasReal
    ? `<div class="monitor__screen monitor__screen--real">${shotInner(dash, { eager: true })}</div>`
    : `<div class="monitor__screen" role="img" aria-label="Illustrative layout of the StitchNXT desktop application. Actual screenshots will be added.">
        <div class="wf">
          <div class="wf__title"><i></i><i></i><i></i><span>StitchNXT</span></div>
          <div class="wf__body">
            <aside class="wf__side">
              ${['Dashboard', 'Customers', 'Tailoring', 'Workshop', 'Inventory', 'Accounts'].map((t, i) => `<span class="${i === 0 ? 'is-on' : ''}">${t}</span>`).join('')}
            </aside>
            <div class="wf__main">
              <div class="wf__cards"><b></b><b></b><b></b><b class="red"></b></div>
              <div class="wf__panel">
                <div class="wf__row head"><i></i><i></i><i></i><i></i></div>
                ${'<div class="wf__row"><i></i><i></i><i></i><i></i></div>'.repeat(5)}
              </div>
              <div class="wf__split"><div></div><div></div></div>
            </div>
          </div>
        </div>
      </div>`;
  return `<section class="hero" aria-labelledby="hero-title">
  <div class="container hero__grid">
    <div class="hero__copy">
      <p class="eyebrow">${icon('LuMonitor', 16)} Windows Desktop Software</p>
      <h1 id="hero-title">One Software. <span class="accent">Complete Control</span> Over Your Shop.</h1>
      <p class="lead">Manage tailoring orders, customer measurements, workshop operations, fabric and garment inventory, billing and accounts — all from one easy-to-use Windows application.</p>
      <div class="btn-row">
        ${demoBtn('Request a Demo', { size: 'lg' })}
        ${btn('Explore Features', '/features/', 'secondary', { size: 'lg' })}
      </div>
      <p class="hero__for">Designed for Tailoring Shops, Fabric Shops &amp; Garment Stores.</p>
    </div>
    <div class="hero__visual">
      <div class="monitor" data-reveal>
        ${screen}
        <div class="monitor__neck"></div><div class="monitor__base"></div>
      </div>
      ${hasReal ? '' : '<p class="mock-note">Illustrative layout · Actual StitchNXT screenshots coming soon</p>'}
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------- HIGHLIGHTS */
export function highlightStrip() {
  const items = [
    ['LuScissors', 'Tailoring Management'],
    ['LuRuler', 'Customer Measurements'],
    ['LuFactory', 'Workshop Tracking'],
    ['LuBoxes', 'Fabric & Garment Inventory'],
    ['LuLandmark', 'Billing & Accounts'],
  ];
  return `<section class="strip" aria-label="StitchNXT at a glance">
  <ul class="container strip__list">
    ${items.map(([i, t]) => `<li>${icon(i, 26)}<span>${esc(t)}</span></li>`).join('')}
  </ul>
</section>`;
}

/* --------------------------------------------------------- INDUSTRY CARDS */
export function industryCards() {
  const cards = [
    { id: 'tailoring', title: 'Tailoring Shops', icons: ['LuScissors', 'LuRuler', 'LuShirt'],
      text: 'Manage customer measurements, tailoring orders, workshop activities, billing and customer deliveries through one integrated application.',
      cta: 'Explore Tailoring Features' },
    { id: 'fabric', title: 'Fabric Shops', icons: ['LuBoxes', 'LuBarcode', 'LuReceiptIndianRupee'],
      text: 'Manage fabric purchases, inventory, barcode printing, sales invoicing and customer and supplier accounts.',
      cta: 'Explore Fabric Shop Features' },
    { id: 'garment', title: 'Garment Shops', icons: ['LuShirt', 'LuTags', 'LuWarehouse'],
      text: 'Organize garment purchases, stock, barcode printing, sales billing and outstanding account tracking.',
      cta: 'Explore Garment Shop Features' },
  ];
  return `<section class="section section--grey" aria-labelledby="who-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Who is StitchNXT for?', title: 'One Solution. <span class="accent">Multiple</span> Business Needs.', text: 'Whether you run a tailoring shop, fabric store, garment outlet or a combination of these businesses, StitchNXT helps bring your everyday operations together.' }).replace('<h2>', '<h2 id="who-title">')}
    <div class="grid grid--3">
      ${cards.map((c) => `<article class="industry-card" data-reveal>
        <div class="industry-card__art" aria-hidden="true">${c.icons.map((i, n) => `<span class="art-ico art-ico--${n}">${icon(i, n === 0 ? 46 : 30)}</span>`).join('')}</div>
        <div class="industry-card__body">
          <h3>${c.title}</h3>
          <p>${c.text}</p>
          <a class="link-arrow" href="/solutions/#${c.id}">${c.cta} ${icon('LuArrowRight', 18)}</a>
        </div>
      </article>`).join('')}
    </div>
    <p class="center-note" data-reveal>Running more than one of these businesses? StitchNXT brings tailoring, fabric and garment operations together in a single application. <a href="/solutions/#combined">See combined businesses</a>.</p>
  </div>
</section>`;
}

/* --------------------------------------------------------- CORE FEATURES */
export function coreFeatures() {
  return `<section class="section" aria-labelledby="core-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Core features', title: 'Everything Your Shop Needs. <span class="accent">All in One Place.</span>', text: 'From customer management to inventory and accounting, manage your important business activities using StitchNXT.' }).replace('<h2>', '<h2 id="core-title">')}
    <div class="grid grid--3 feature-groups">
      ${homeGroups.map((g) => `<div class="fgroup" data-reveal>
        <h3 class="fgroup__title"><span class="fgroup__ico">${icon(g.icon, 22)}</span>${g.title}</h3>
        <ul>${g.items.map(([i, t, d]) => `<li>${icon(i, 22, 'fi')}<div><strong>${esc(t)}</strong><span>${esc(d)}</span></div></li>`).join('')}</ul>
      </div>`).join('')}
    </div>
    <div class="center-cta" data-reveal>${btn('Explore All Features', '/features/', 'secondary', { iconRight: 'LuArrowRight' })}</div>
  </div>
</section>`;
}

/* -------------------------------------------------------- WORKFLOW DIAGRAM */
export function workflow() {
  const steps = [
    ['LuUserPlus', 'Customer Registration'],
    ['LuRuler', 'Customer Measurements'],
    ['LuReceiptIndianRupee', 'Tailoring Invoice'],
    ['LuFactory', 'Workshop Issue'],
    ['LuArrowDownLeft', 'Workshop Inward'],
    ['LuWallet', 'Workshop Billing'],
    ['LuTruck', 'Customer Delivery'],
  ];
  return `<ol class="workflow" aria-label="Tailoring workflow from registration to delivery">
    ${steps.map(([i, t], n) => `<li data-reveal style="--d:${n * 60}ms"><span class="workflow__node">${icon(i, 24)}</span><span class="workflow__num">${String(n + 1).padStart(2, '0')}</span><span class="workflow__label">${t}</span></li>`).join('')}
  </ol>`;
}

/* ------------------------------------------------------ TAILORING SHOWCASE */
export function tailoringShowcase() {
  return `<section class="section section--beige" aria-labelledby="tail-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Tailoring management', title: 'Your Complete <span class="accent">Tailoring Business,</span> Organized.', text: 'Follow every order through one connected workflow — from the moment a customer is registered to the day the garment is delivered.' }).replace('<h2>', '<h2 id="tail-title">')}
    ${workflow()}
    <div class="split">
      <div class="split__copy" data-reveal>
        <h3>Less paperwork. Clearer orders.</h3>
        ${checkList([
          'Maintain customer information.',
          'Save and manage customer measurements.',
          'Generate tailoring invoices.',
          'Track garments issued to the workshop.',
          'Record workshop inward activities.',
          'Manage workshop billing.',
          'Track pending customer deliveries.',
        ])}
        <div class="btn-row">${demoBtn()}${btn('See Tailoring Features', '/solutions/#tailoring', 'secondary')}</div>
      </div>
      <div class="split__media">${shotWindow('tailoring-invoice', { caption: 'Tailoring Invoice' })}</div>
    </div>
  </div>
</section>`;
}

/* -------------------------------------------------- FABRIC & GARMENT SHOWCASE */
export function inventoryShowcase() {
  const items = [
    ['LuShoppingCart', 'Fabric purchase management'],
    ['LuShoppingBag', 'Garment purchase management'],
    ['LuWarehouse', 'Fabric inventory tracking'],
    ['LuShirt', 'Garment inventory tracking'],
    ['LuReceiptIndianRupee', 'Fabric sales invoicing'],
    ['LuReceiptIndianRupee', 'Garment sales invoicing'],
    ['LuBarcode', 'Barcode printing'],
    ['LuUsers', 'Customer and supplier records'],
  ];
  return `<section class="section" aria-labelledby="inv-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Fabric & garment management', title: 'Take Control of Your <span class="accent">Fabric &amp; Garment</span> Business.', text: 'Manage purchases, stock, barcode printing and sales billing in an organized way.' }).replace('<h2>', '<h2 id="inv-title">')}
    <div class="split split--reverse">
      <div class="split__media">${shotWindow('inventory', { caption: 'Inventory' })}</div>
      <div class="split__copy" data-reveal>
        <ul class="icon-grid">${items.map(([i, t]) => `<li>${icon(i, 22)}<span>${t}</span></li>`).join('')}</ul>
        <div class="btn-row">${demoBtn()}${btn('See Fabric & Garment Features', '/features/#inventory', 'secondary')}</div>
      </div>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------- ACCOUNTS SHOWCASE */
export function accountsShowcase() {
  const items = [
    ['LuArrowDownLeft', 'Receivables outstanding'],
    ['LuArrowUpRight', 'Payables outstanding'],
    ['LuBookOpen', 'Customer account ledger'],
    ['LuBookOpen', 'Supplier account ledger'],
    ['LuListChecks', 'Transaction history'],
  ];
  return `<section class="section section--dark" aria-labelledby="acc-title">
  <div class="container">
    <div class="split">
      <div class="split__copy" data-reveal>
        <p class="eyebrow eyebrow--light">Accounts management</p>
        <h2 id="acc-title">Keep Your Business Accounts <span class="accent-light">Organized.</span></h2>
        <p class="lead lead--light">Get a better overview of customer outstanding balances, supplier payments and account transactions.</p>
        <ul class="list-rows">${items.map(([i, t]) => `<li>${icon(i, 22)}<span>${t}</span></li>`).join('')}</ul>
        <div class="btn-row">${demoBtn()}</div>
      </div>
      <div class="split__media">${shotWindow('accounts-ledger', { caption: 'Accounts & Ledger' })}</div>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------ WHY CHOOSE */
export function whyChoose() {
  const items = [
    ['LuStore', 'Industry-Specific Solution', 'Designed around the operational requirements of tailoring, fabric and garment businesses.'],
    ['LuLayers', 'Integrated Operations', 'Manage multiple business activities through one application.'],
    ['LuUsers', 'Organized Customer Records', 'Maintain customer details and measurement information.'],
    ['LuReceiptIndianRupee', 'Simplified Billing', 'Manage tailoring and retail invoicing.'],
    ['LuBoxes', 'Inventory Visibility', 'Track fabric and garment stock.'],
    ['LuFactory', 'Workshop Tracking', 'Organize workshop issue and inward activities.'],
    ['LuLandmark', 'Account Management', 'Track customer receivables and supplier payables.'],
    ['LuMonitor', 'Windows Desktop Application', 'A dedicated desktop application for your business operations.'],
  ];
  return `<section class="section section--beige" aria-labelledby="why-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Why StitchNXT', title: 'Built Around the Way <span class="accent">Your Business</span> Works.' }).replace('<h2>', '<h2 id="why-title">')}
    <div class="grid grid--4">
      ${items.map(([i, t, d], n) => `<article class="why-card" data-reveal style="--d:${(n % 4) * 70}ms"><span class="why-card__ico">${icon(i, 26)}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}
    </div>
  </div>
</section>`;
}

/* --------------------------------------------------------------- GALLERY */
/**
 * mode 'category' → one chip per screenshot category (homepage)
 * mode 'group'    → chips per group (Product Tour)
 */
export function gallery({ mode = 'category', id = 'gallery' } = {}) {
  const groupOf = (s) => shotCategories.find((c) => c.id === s.category)?.group || 'Other';
  const keyOf = (s) => (mode === 'group' ? groupOf(s) : s.category);
  const chips = mode === 'group'
    ? [...new Set(shotCategories.map((c) => c.group))].map((g) => [g, g])
    : shotCategories.map((c) => [c.id, c.label]);
  return `<div class="gallery" data-gallery id="${id}">
  <div class="gallery__tabs" role="group" aria-label="Filter screenshots by category">
    <button type="button" class="chip is-active" data-filter="all" aria-pressed="true">All</button>
    ${chips.map(([k, l]) => `<button type="button" class="chip" data-filter="${esc(k)}" aria-pressed="false">${esc(l)}</button>`).join('')}
  </div>
  <ul class="gallery__grid${mode === 'group' ? ' gallery__grid--wide' : ''}">
    ${screenshots.map((s) => `<li data-cat="${esc(keyOf(s))}">
      <figure class="shot-card">
        <button type="button" class="shot-card__btn" data-lightbox aria-label="Enlarge screenshot: ${esc(s.title)}">
          <div class="shot-frame">${shotInner(s)}</div>
          <span class="shot-card__zoom">${icon('LuMaximize2', 18)}</span>
        </button>
        <figcaption><strong>${esc(s.title)}</strong><span>${esc(s.caption)}</span>${mode === 'group' ? `<em>${esc(s.feature)}</em>` : ''}</figcaption>
      </figure>
    </li>`).join('')}
  </ul>
  <p class="gallery__empty" hidden>No screenshots in this category yet.</p>
</div>`;
}

export function screenshotShowcase() {
  return `<section class="section section--grey" aria-labelledby="shots-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Software showcase', title: 'Explore the <span class="accent">StitchNXT</span> Application.', text: 'Take a closer look at the application and discover how its features help organize everyday shop operations.' }).replace('<h2>', '<h2 id="shots-title">')}
    ${gallery({ mode: 'category', id: 'home-gallery' })}
    <div class="center-cta" data-reveal>${btn('View Product Tour', '/product-tour/', 'secondary', { iconRight: 'LuArrowRight' })}</div>
  </div>
</section>`;
}

/* ------------------------------------------------------------ GET STARTED */
export function gettingStarted() {
  const steps = [
    ['Contact Us', 'Tell us about your business requirements.', 'LuMessageCircle'],
    ['Request a Demonstration', 'Explore StitchNXT and its features.', 'LuPlay'],
    ['Software Installation', 'Get the Windows desktop application installed.', 'LuDownload'],
    ['Start Managing Your Business', 'Begin organizing your daily operations with StitchNXT.', 'LuCircleCheck'],
  ];
  return `<section class="section section--beige" aria-labelledby="start-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'How to get started', title: 'Getting Started Is <span class="accent">Simple.</span>' }).replace('<h2>', '<h2 id="start-title">')}
    <ol class="timeline">
      ${steps.map(([t, d, i], n) => `<li data-reveal style="--d:${n * 80}ms"><span class="timeline__num">${String(n + 1).padStart(2, '0')}</span><span class="timeline__ico">${icon(i, 22)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
    <div class="center-cta" data-reveal>${demoBtn('Request a Demo')}</div>
  </div>
</section>`;
}

/* ------------------------------------------------------------------- FAQ */
export function faqSection() {
  return `<section class="section" aria-labelledby="faq-title">
  <div class="container container--narrow">
    ${sectionHead({ eyebrow: 'FAQ', title: 'Frequently Asked <span class="accent">Questions.</span>' }).replace('<h2>', '<h2 id="faq-title">')}
    <div class="faq" data-faq>
      ${faqs.map(([q, a], n) => `<div class="faq__item">
        <h3><button type="button" class="faq__q" id="faq-q-${n}" aria-expanded="false" aria-controls="faq-a-${n}">${esc(q)}<span class="faq__chev">${icon('LuChevronDown', 22)}</span></button></h3>
        <div class="faq__a" id="faq-a-${n}" role="region" aria-labelledby="faq-q-${n}"><div><p>${esc(a)}</p></div></div>
      </div>`).join('')}
    </div>
  </div>
</section>`;
}

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}

/* ------------------------------------------------------------- FINAL CTA */
export function finalCta({ title = 'Ready to Manage Your Shop <span class="accent-light">Smarter?</span>', text = 'Discover how StitchNXT can simplify your tailoring, inventory, billing and business management activities.' } = {}) {
  const wa = whatsappUrl();
  return `<section class="cta-band" aria-labelledby="cta-title">
  <div class="container">
    <div class="cta-card" data-reveal>
      <h2 id="cta-title">${title}</h2>
      <p>${esc(text)}</p>
      <div class="btn-row btn-row--center">
        ${demoBtn('Request a Demo', { size: 'lg' })}
        ${btn('Contact Us', '/contact/', 'outline-light', { size: 'lg' })}
        ${wa ? `<a class="btn btn--outline-light btn--lg" href="${esc(wa)}" target="_blank" rel="noopener">${icon('LuMessageCircle', 18)} WhatsApp Us</a>` : ''}
      </div>
    </div>
  </div>
</section>`;
}

/** Page banner used by inner pages. */
export function pageHero({ eyebrow, title, text, actions = '' }) {
  return `<section class="page-hero">
  <div class="container">
    <p class="eyebrow">${esc(eyebrow)}</p>
    <h1>${title}</h1>
    <p class="lead">${esc(text)}</p>
    ${actions ? `<div class="btn-row">${actions}</div>` : ''}
  </div>
</section>`;
}
