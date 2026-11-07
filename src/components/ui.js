/** Small shared helpers: icons, escaping, buttons, screenshot rendering. */
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as lu from 'react-icons/lu';
import site from '../config/site.js';
import { screenshots } from '../content/screenshots.js';

export const ROOT = path.resolve(import.meta.dirname, '../..');
export const DEMO_URL = '/contact/#enquiry';

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Inline Lucide-style SVG icon, rendered at build time (zero runtime JS). */
export function icon(name, size = 24, cls = '') {
  const C = lu[name];
  if (!C) throw new Error(`Unknown icon: ${name}`);
  return renderToStaticMarkup(
    React.createElement(C, { size, className: `icon ${cls}`.trim(), 'aria-hidden': 'true', focusable: 'false' })
  );
}

export function btn(label, href, variant = 'primary', opts = {}) {
  const { size = '', iconRight = '', extra = '' } = opts;
  const cls = `btn btn--${variant}${size ? ` btn--${size}` : ''}${extra ? ` ${extra}` : ''}`;
  return `<a class="${cls}" href="${href}">${esc(label)}${iconRight ? icon(iconRight, 18) : ''}</a>`;
}

export const demoBtn = (label = 'Request a Demo', opts = {}) => btn(label, DEMO_URL, 'primary', { iconRight: 'LuArrowRight', ...opts });

export function whatsappUrl(message = 'Hello, I would like to request a demo of StitchNXT.') {
  const n = (site.contact.whatsapp || '').replace(/\D/g, '');
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(message)}` : '';
}

export function sectionHead({ eyebrow = '', title, text = '', center = true, tag = 'h2', light = false }) {
  return `<div class="section-head${center ? ' is-center' : ''}${light ? ' is-light' : ''}" data-reveal>
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
    <${tag}>${title}</${tag}>
    ${text ? `<p class="section-head__text">${esc(text)}</p>` : ''}
  </div>`;
}

/** Look up a screenshot entry by category id. */
export const shotByCategory = (id) => screenshots.find((s) => s.category === id);

/**
 * Renders either the real screenshot (if the file exists in
 * public/assets/screenshots/) or an honest placeholder.
 */
export function shotInner(s, { eager = false } = {}) {
  const has = s.file && fs.existsSync(path.join(ROOT, 'public/assets/screenshots', s.file));
  if (has) {
    return `<img src="/assets/screenshots/${esc(s.file)}" alt="StitchNXT screen: ${esc(s.title)}" width="1600" height="1000" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`;
  }
  return `<div class="shot-ph" role="img" aria-label="Placeholder: ${esc(s.title)} screenshot to be added">${icon('LuMonitor', 34)}<strong>${esc(s.title)}</strong><span>Screenshot to be added</span></div>`;
}

/** Framed screenshot (window chrome) used in split sections. */
export function shotWindow(categoryId, { title, caption } = {}) {
  const s = shotByCategory(categoryId) || { title: title || 'Screenshot', file: '' };
  const t = title || s.title;
  return `<figure class="window" data-reveal>
    <div class="window__bar" aria-hidden="true"><i></i><i></i><i></i><span>StitchNXT · ${esc(t)}</span></div>
    <div class="shot-frame">${shotInner({ ...s, title: t })}</div>
    ${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}
  </figure>`;
}

export const checkList = (items, cls = '') =>
  `<ul class="check-list ${cls}">${items.map((i) => `<li>${icon('LuCheck', 18)}<span>${esc(i)}</span></li>`).join('')}</ul>`;
