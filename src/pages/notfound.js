import { btn } from '../components/ui.js';

export default function notFound() {
  return {
    path: '/404.html',
    title: 'Page not found | StitchNXT',
    description: 'The page you are looking for could not be found.',
    noindex: true,
    body: `<section class="page-hero"><div class="container">
      <p class="eyebrow">Error 404</p>
      <h1>We couldn’t find <span class="accent">that page.</span></h1>
      <p class="lead">The link may be outdated or the page may have moved.</p>
      <div class="btn-row">${btn('Back to Home', '/', 'primary')}${btn('Contact Us', '/contact/', 'secondary')}</div>
    </div></section>`,
  };
}
