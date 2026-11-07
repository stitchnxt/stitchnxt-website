/**
 * ============================================================
 *  STITCHNXT — SITE CONFIGURATION  (edit this file)
 * ============================================================
 *  Everything business-specific lives here. Leave a value as ''
 *  and the website shows a clearly marked placeholder instead of
 *  inventing details. Run `npm run build` after any change.
 */
export default {
  name: 'StitchNXT',

  /**
   * Public domain of the live site, no trailing slash.
   * Used for canonical URLs, Open Graph, sitemap.xml and robots.txt.
   * Override at build time:  SITE_URL=https://www.yourdomain.com npm run build
   */
  siteUrl: process.env.SITE_URL || 'https://YOUR-DOMAIN.com',

  /** Year shown in the footer copyright. */
  copyrightYear: 2026,

  // ---------------------------------------------------------
  // CONTACT DETAILS — leave '' until confirmed.
  // ---------------------------------------------------------
  contact: {
    email: '',      // e.g. 'sales@yourdomain.com'
    phone: '',      // e.g. '+91 00000 00000'  (shown as text and tel: link)
    whatsapp: '',   // digits only with country code, e.g. '910000000000'. When set, WhatsApp buttons appear.
    address: '',    // e.g. 'Shop No., Street, City, State, PIN'
  },

  // ---------------------------------------------------------
  // SOCIAL LINKS — full URLs. Empty ones are not rendered as links.
  // ---------------------------------------------------------
  social: {
    facebook: '',
    instagram: '',
    youtube: '',
    linkedin: '',
  },

  // ---------------------------------------------------------
  // ENQUIRY FORM DELIVERY (see src/scripts/main.js → "FORM DELIVERY")
  // Choose whichever method you set up; they are tried in this order:
  //   1. formEndpoint  – URL of a form service / your backend that accepts
  //                      a JSON POST (Formspree, Web3Forms, Getform, own API …)
  //   2. contact.whatsapp – opens WhatsApp with the enquiry pre-filled
  //   3. contact.email    – opens the visitor's mail app with the enquiry
  // If none is set, the form validates but shows a "not connected yet"
  // notice instead of pretending to send.
  // ---------------------------------------------------------
  formEndpoint: '',

  /**
   * Privacy Policy and Terms are placeholders. While false, those two pages
   * show a "draft" banner, are marked noindex and are left out of sitemap.xml.
   * Set to true only after approved legal text replaces the placeholder copy
   * in src/pages/legal.js.
   */
  legalReviewed: false,

  /**
   * Show each client's locality (e.g. "C.G. Road") in small text on its card.
   * Helps tell apart several outlets of one brand. Set to false to show city only.
   */
  showClientArea: true,
};
