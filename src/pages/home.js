import site from '../config/site.js';
import { clientsSection } from '../components/clients.js';
import { hero, highlightStrip, industryCards, coreFeatures, tailoringShowcase, inventoryShowcase, accountsShowcase, whyChoose, screenshotShowcase, gettingStarted, faqSection, faqJsonLd, finalCta } from '../components/sections.js';

export default function home() {
  return {
    path: '/',
    title: 'StitchNXT – Tailoring, Fabric & Garment Shop Management Software',
    description: 'Manage tailoring invoices, customer measurements, workshop operations, fabric and garment inventory, barcode printing, billing and accounts with StitchNXT Windows software.',
    lightbox: true,
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'StitchNXT',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Windows',
        description: 'Windows desktop management software for tailoring shops, fabric shops and garment businesses.',
        url: site.siteUrl + '/',
      },
      { '@context': 'https://schema.org', '@type': 'Organization', name: 'StitchNXT', url: site.siteUrl + '/', logo: site.siteUrl + '/assets/stitchnxt-logo.png' },
      faqJsonLd(),
    ],
    body: [
      hero(), highlightStrip(), industryCards(), coreFeatures(), tailoringShowcase(),
      inventoryShowcase(), accountsShowcase(), whyChoose(), clientsSection(), screenshotShowcase(),
      gettingStarted(), faqSection(), finalCta(),
    ].join('\n'),
  };
}
