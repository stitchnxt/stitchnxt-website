import site from '../config/site.js';
import { sectionHead, btn, demoBtn } from '../components/ui.js';
import { pageHero, faqSection, finalCta } from '../components/sections.js';
import { planCards, comparison, pricingNotice } from '../components/pricing.js';
import { allFeatures } from '../data/pricingModel.js';
import { pricingFaqs } from '../content/pricingFaq.js';

export default function pricingPage() {
  return {
    path: '/pricing/',
    title: 'StitchNXT Pricing | Tailoring, Fabric & Garment Shop Software',
    description: 'Explore StitchNXT subscription plans for tailoring shops, fabric retailers and garment stores. Compare features and choose the right Windows business management software plan.',
    // Kept out of search engines and the sitemap until the prices and feature allocation are approved.
    noindex: !site.pricingReviewed,
    body: [
      pageHero({
        eyebrow: 'Pricing',
        title: 'Simple Plans. <span class="accent">Complete Business Management.</span>',
        text: 'Choose the StitchNXT subscription designed around your business. Whether you operate a tailoring shop, fabric store or garment business, we have a plan to match your requirements.',
        actions: btn('Compare Plans', '#compare', 'primary', { size: 'lg', iconRight: 'LuArrowRight' }) + demoBtn('Request a Demo', { size: 'lg' }).replace('btn--primary', 'btn--secondary'),
      }),
      `<section class="section" id="plans" aria-labelledby="plans-title">
        <div class="container">
          ${pricingNotice() ? pricingNotice().replace('<div class="container">', '<div>') : ''}
          ${sectionHead({ eyebrow: 'Subscription plans', title: 'Seven Plans. <span class="accent">One Application.</span>', text: 'Every plan is a Windows desktop subscription with a monthly-equivalent rate and annual payment.' }).replace('<h2>', '<h2 id="plans-title">')}
          ${planCards()}
        </div>
      </section>`,
      `<section class="section section--beige" id="compare" aria-labelledby="compare-title">
        <div class="container">
          ${sectionHead({ eyebrow: 'Compare plans', title: `Compare All ${allFeatures.length} <span class="accent">Features.</span>`, text: 'See exactly what each plan includes, or show a single plan to compare it on a small screen.' }).replace('<h2>', '<h2 id="compare-title">')}
          ${comparison()}
        </div>
      </section>`,
      faqSection(pricingFaqs, { prefix: 'pfaq', eyebrow: 'Pricing FAQ', heading: 'Pricing &amp; Plans <span class="accent">Questions.</span>', id: 'pfaq-title' }),
      finalCta({ title: 'Not Sure Which Plan <span class="accent-light">Fits Your Shop?</span>', text: 'Tell us about your business and we will help you choose the right StitchNXT plan.' }),
    ].join('\n'),
  };
}
