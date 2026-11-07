import site from '../config/site.js';
import { esc, icon, whatsappUrl } from '../components/ui.js';
import { pageHero } from '../components/sections.js';
import { contactItem } from '../components/layout.js';

const TYPES = ['Tailoring Shop', 'Fabric Shop', 'Garment Shop', 'Combined Business', 'Other'];

export default function contactPage() {
  const wa = whatsappUrl();
  const field = (id, label, extra = '', req = true, type = 'text') =>
    `<div class="field"><label for="${id}">${label}${req ? ' <span class="req" aria-hidden="true">*</span>' : ' <span class="opt">(optional)</span>'}</label><input id="${id}" name="${id}" type="${type}" ${req ? 'required aria-required="true"' : ''} ${extra}><p class="field__err" id="${id}-err" role="alert"></p></div>`;
  return {
    path: '/contact/',
    title: 'Contact Us – Request a StitchNXT Demo',
    description: 'Request a demonstration of StitchNXT, the Windows software for tailoring, fabric and garment shops. Tell us about your business and we will get in touch.',
    body: [
      pageHero({ eyebrow: 'Contact Us', title: 'Request a <span class="accent">Demo</span> of StitchNXT.', text: 'Tell us about your business and what you would like to see. We will get in touch to arrange a demonstration.' }),
      `<section class="section" id="enquiry"><div class="container contact-grid">
        <div class="form-card" data-reveal>
          <h2>Send us your enquiry</h2>
          <!--
            ENQUIRY FORM
            Delivery is configured in src/config/site.js (formEndpoint / contact.whatsapp / contact.email)
            and handled by src/scripts/main.js → "FORM DELIVERY". Until one is set, the form validates
            but tells the visitor it is not yet connected (it never pretends to send).
          -->
          <form id="enquiry-form" novalidate data-endpoint="${esc(site.formEndpoint)}" data-whatsapp="${esc(site.contact.whatsapp.replace(/\D/g, ''))}" data-email="${esc(site.contact.email)}">
            <div class="form-grid">
              ${field('fullName', 'Full Name', 'autocomplete="name"')}
              ${field('businessName', 'Business Name', 'autocomplete="organization"')}
              <div class="field"><label for="businessType">Business Type <span class="req" aria-hidden="true">*</span></label>
                <select id="businessType" name="businessType" required aria-required="true"><option value="">Select business type</option>${TYPES.map((t) => `<option>${t}</option>`).join('')}</select><p class="field__err" id="businessType-err" role="alert"></p></div>
              ${field('mobile', 'Mobile Number', 'autocomplete="tel" inputmode="tel"', true, 'tel')}
              ${field('email', 'Email Address', 'autocomplete="email" inputmode="email"', false, 'email')}
              ${field('city', 'City', 'autocomplete="address-level2"', false)}
              <div class="field field--full"><label for="message">Message <span class="opt">(optional)</span></label><textarea id="message" name="message" rows="5" placeholder="Tell us about your shop and what you would like to see in the demo."></textarea></div>
            </div>
            <div class="hp" aria-hidden="true"><label>Leave this empty <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
            <button class="btn btn--primary btn--lg" type="submit">Request a Demo ${icon('LuArrowRight', 18)}</button>
            <p class="form-status" id="form-status" role="status" aria-live="polite" tabindex="-1"></p>
          </form>
        </div>
        <aside class="contact-card" data-reveal aria-label="Contact details">
          <h2>Contact details</h2>
          <ul class="contact-list">${['email', 'phone', 'whatsapp', 'address'].map((k) => contactItem(k)).join('')}</ul>
          ${wa ? `<a class="btn btn--secondary" href="${esc(wa)}" target="_blank" rel="noopener">${icon('LuMessageCircle', 18)} Chat on WhatsApp</a>` : ''}
          <h3>Follow us</h3>
          <p class="placeholder">${Object.values(site.social).some(Boolean) ? Object.entries(site.social).filter(([, v]) => v).map(([k, v]) => `<a href="${esc(v)}" target="_blank" rel="noopener">${k[0].toUpperCase() + k.slice(1)}</a>`).join(' · ') : '[Social media links – add in site config]'}</p>
          <div class="note-box">${icon('LuMonitor', 20)}<p>StitchNXT is Windows desktop software for tailoring, fabric and garment businesses.</p></div>
        </aside>
      </div></section>`,
    ].join('\n'),
  };
}
