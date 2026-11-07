import { demoBtn } from '../components/ui.js';
import { pageHero, gallery, finalCta } from '../components/sections.js';

export default function tourPage() {
  return {
    path: '/product-tour/',
    title: 'Product Tour – See the StitchNXT Windows Application | StitchNXT',
    description: 'Take a visual tour of StitchNXT: tailoring invoice, customer measurements, workshop management, inventory, barcode printing and account ledgers.',
    lightbox: true,
    body: [
      pageHero({ eyebrow: 'Product Tour', title: 'See <span class="accent">StitchNXT</span> in Action.', text: 'Browse the screens of the application by category. Click any screen to enlarge it.', actions: demoBtn('Request a Demo', { size: 'lg' }) }),
      `<section class="section section--grey"><div class="container">${gallery({ mode: 'group', id: 'tour-gallery' })}</div></section>`,
      finalCta(),
    ].join('\n'),
  };
}
