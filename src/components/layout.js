/** Header, mobile menu, footer and the HTML document shell shared by every page. */
import site from '../config/site.js';
import { features } from '../content/features.js';
import { esc, icon, DEMO_URL, btn, whatsappUrl } from './ui.js';
import { hasClients } from '../data/clientsModel.js';

export const NAV = [
  ['Home', '/'],
  ['Features', '/features/'],
  ['Solutions', '/solutions/'],
  ['Product Tour', '/product-tour/'],
  // The "Our Clients" link only appears while there is at least one client to show (src/data/clients.js).
  ...(hasClients ? [['Our Clients', '/#clients']] : []),
  ['About Us', '/about/'],
  ['Contact Us', '/contact/'],
];

const LOGO_ALT = 'StitchNXT – Solution for Next Generation Tailor Shops';

function header(current) {
  const links = NAV.map(
    ([label, href]) =>
      `<a href="${href}"${href === current ? ' aria-current="page"' : ''}>${label}</a>`
  ).join('');
  return `<header class="site-header" data-header>
  <div class="container header__inner">
    <a class="brand" href="/" aria-label="StitchNXT – home">
      <img src="/assets/stitchnxt-logo.png" alt="${LOGO_ALT}" width="497" height="109" decoding="async">
    </a>
    <nav class="nav" aria-label="Primary">${links}</nav>
    <a class="btn btn--primary btn--sm header__cta" href="${DEMO_URL}">Request a Demo</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu" data-nav-toggle>
      <span class="nav-toggle__open">${icon('LuMenu', 26)}</span><span class="nav-toggle__close">${icon('LuX', 26)}</span>
    </button>
  </div>
  <div class="mobile-menu" id="mobile-menu" data-mobile-menu>
    <nav class="container" aria-label="Mobile">
      ${links}
      <a class="btn btn--primary btn--block" href="${DEMO_URL}">Request a Demo</a>
    </nav>
  </div>
</header>`;
}

/** Shows the real value when configured, otherwise a visible, clearly marked placeholder. */
export function contactItem(kind, { asLink = true } = {}) {
  const c = site.contact;
  const defs = {
    email: { icon: 'LuMail', value: c.email, href: c.email && `mailto:${c.email}`, ph: 'Contact email – add in site config' },
    phone: { icon: 'LuPhone', value: c.phone, href: c.phone && `tel:${c.phone.replace(/[^\d+]/g, '')}`, ph: 'Phone number – add in site config' },
    whatsapp: { icon: 'LuMessageCircle', value: c.whatsapp && `WhatsApp: +${c.whatsapp.replace(/\D/g, '')}`, href: whatsappUrl(), ph: 'WhatsApp number – add in site config' },
    address: { icon: 'LuMapPin', value: c.address, href: '', ph: 'Business address – add in site config' },
  };
  const d = defs[kind];
  const body = d.value
    ? d.href && asLink ? `<a href="${esc(d.href)}"${kind === 'whatsapp' ? ' target="_blank" rel="noopener"' : ''}>${esc(d.value)}</a>` : `<span>${esc(d.value)}</span>`
    : `<span class="placeholder">[${d.ph}]</span>`;
  return `<li>${icon(d.icon, 18)}${body}</li>`;
}

function socialLinks() {
  const defs = [
    ['facebook', 'LuFacebook', 'Facebook'],
    ['instagram', 'LuInstagram', 'Instagram'],
    ['youtube', 'LuYoutube', 'YouTube'],
    ['linkedin', 'LuLinkedin', 'LinkedIn'],
  ];
  const on = defs.filter(([k]) => site.social[k]);
  if (!on.length) return `<p class="placeholder placeholder--dark">[Social media links – add in site config]</p>`;
  return `<ul class="social">${on
    .map(([k, i, label]) => `<li><a href="${esc(site.social[k])}" target="_blank" rel="noopener" aria-label="StitchNXT on ${label}">${icon(i, 20)}</a></li>`)
    .join('')}</ul>`;
}

function footer() {
  const featLinks = ['tailoring-invoice', 'customer-measurements', 'workshop-issue-inward', 'barcode-printing', 'fabric-inventory', 'receivables-outstanding']
    .map((s) => features.find((f) => f.slug === s))
    .map((f) => `<li><a href="/features/#${f.slug}">${esc(f.title)}</a></li>`)
    .join('');
  return `<footer class="site-footer">
  <div class="container footer__grid">
    <div class="footer__brand">
      <a class="footer__logo" href="/" aria-label="StitchNXT – home"><img src="/assets/stitchnxt-logo.png" alt="${LOGO_ALT}" width="497" height="109" loading="lazy" decoding="async"></a>
      <p>StitchNXT is an integrated Windows desktop management solution for tailoring shops, fabric shops and garment businesses.</p>
      ${btn('Request a Demo', DEMO_URL, 'primary', { size: 'sm', iconRight: 'LuArrowRight' })}
    </div>
    <div>
      <h2 class="footer__title">Quick Links</h2>
      <ul class="footer__list">${NAV.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h2 class="footer__title">Features</h2>
      <ul class="footer__list">${featLinks}<li><a href="/features/">All features</a></li></ul>
    </div>
    <div>
      <h2 class="footer__title">Solutions</h2>
      <ul class="footer__list">
        <li><a href="/solutions/#tailoring">Tailoring Shop Software</a></li>
        <li><a href="/solutions/#fabric">Fabric Shop Software</a></li>
        <li><a href="/solutions/#garment">Garment Shop Software</a></li>
        <li><a href="/solutions/#combined">Combined Businesses</a></li>
      </ul>
    </div>
    <div>
      <h2 class="footer__title">Get in Touch</h2>
      <ul class="footer__contact">${['email', 'phone', 'whatsapp', 'address'].map((k) => contactItem(k)).join('')}</ul>
      ${socialLinks()}
    </div>
  </div>
  <div class="container footer__bar">
    <p>© ${site.copyrightYear} StitchNXT. All Rights Reserved.</p>
    <ul>
      <li><a href="/privacy-policy/">Privacy Policy</a></li>
      <li><a href="/terms-and-conditions/">Terms &amp; Conditions</a></li>
    </ul>
  </div>
</footer>`;
}

const lightbox = `<dialog class="lightbox" data-lightbox-dialog aria-label="Screenshot preview">
  <div class="lightbox__inner">
    <button type="button" class="lightbox__btn lightbox__close" data-lb-close aria-label="Close preview">${icon('LuX', 24)}</button>
    <button type="button" class="lightbox__btn lightbox__prev" data-lb-prev aria-label="Previous screenshot">${icon('LuChevronLeft', 28)}</button>
    <button type="button" class="lightbox__btn lightbox__next" data-lb-next aria-label="Next screenshot">${icon('LuChevronRight', 28)}</button>
    <figure class="lightbox__figure"><div class="lightbox__media" data-lb-media></div><figcaption data-lb-caption></figcaption></figure>
  </div>
</dialog>`;

/**
 * Wraps page content in the full HTML document.
 * page = { path, title, description, body, lightbox?, noindex?, jsonld?[] , ogImage? }
 */
export function layout(page) {
  const url = site.siteUrl + page.path;
  const og = `${site.siteUrl}/assets/branding/og-image.png`;
  const wa = whatsappUrl();
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<link rel="canonical" href="${esc(url)}">
<meta name="theme-color" content="#EAE6D9">
<meta property="og:type" content="website">
<meta property="og:site_name" content="StitchNXT">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${og}">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/branding/favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/branding/favicon-192.png">
<link rel="apple-touch-icon" href="/assets/branding/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap">
<link rel="preload" as="image" href="/assets/stitchnxt-logo.png">
<link rel="stylesheet" href="/assets/css/main.css">
<script>document.documentElement.classList.add('js')</script>
${(page.jsonld || []).map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
</head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>
${header(page.path)}
<main id="main">
${page.body}
</main>
${footer()}
${page.lightbox ? lightbox : ''}
${wa ? `<a class="wa-float" href="${esc(wa)}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${icon('LuMessageCircle', 26)}</a>` : ''}
<script src="/assets/js/main.js" defer></script>
</body>
</html>
`;
}
