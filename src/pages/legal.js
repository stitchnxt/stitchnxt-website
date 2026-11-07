import site from '../config/site.js';
import { icon } from '../components/ui.js';
import { pageHero } from '../components/sections.js';

/**
 * PRIVACY POLICY & TERMS — PLACEHOLDER CONTENT ONLY.
 * Replace every section below with approved legal text before publishing, then
 * set `legalReviewed: true` in src/config/site.js. No legal company details have been invented.
 */
const banner = `<div class="draft-banner" role="note">${icon('LuTriangleAlert', 22)}<p><strong>Draft placeholder.</strong> This page has not been legally reviewed. Replace it with approved content before publishing.</p></div>`;

const ph = '[Placeholder – replace with approved wording.]';

function doc(path, title, desc, heading, sections) {
  return {
    path, title, description: desc, noindex: !site.legalReviewed,
    body: [
      pageHero({ eyebrow: 'Legal', title: heading, text: 'Last updated: [add date]' }),
      `<section class="section"><div class="container container--narrow prose">
        ${site.legalReviewed ? '' : banner}
        ${sections.map(([h, p]) => `<h2>${h}</h2><p>${p}</p>`).join('')}
      </div></section>`,
    ].join('\n'),
  };
}

export const privacy = () => doc('/privacy-policy/', 'Privacy Policy | StitchNXT', 'Privacy Policy for the StitchNXT website.', 'Privacy <span class="accent">Policy</span>', [
  ['Introduction', `${ph} Describe who operates this website: [legal business name].`],
  ['Information you provide', 'The enquiry form on the Contact page asks for your name, business name, business type, mobile number, email address, city and message. [Confirm and expand with approved wording.]'],
  ['How information is used', `${ph}`],
  ['Sharing of information', `${ph}`],
  ['Your choices and contact', `${ph} Contact: [privacy contact email].`],
]);

export const terms = () => doc('/terms-and-conditions/', 'Terms & Conditions | StitchNXT', 'Terms and Conditions for the StitchNXT website.', 'Terms &amp; <span class="accent">Conditions</span>', [
  ['Use of this website', `${ph}`],
  ['About the software', 'StitchNXT is a Windows desktop application. [Add approved licensing and usage terms.]'],
  ['Limitation of liability', `${ph}`],
  ['Governing law', `${ph}`],
  ['Contact', `${ph} Contact: [legal contact email].`],
]);
