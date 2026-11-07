/** Pricing UI: plan cards, comparison table, homepage preview. All data comes from src/data/pricing.js. */
import site from '../config/site.js';
import { esc, icon, btn, sectionHead } from './ui.js';
import { plans, planGroups, featureGroups, allFeatures, currency, money, moneyNumber, status } from '../data/pricingModel.js';

export const planUrl = (p) => `/contact/?plan=${encodeURIComponent(p.id)}#enquiry`;
const optionLabel = (p) => (p.subtitle ? `${p.name} (${p.subtitle})` : p.name);
export { optionLabel };

/* ---------- price block ---------- */
function priceBlock(p, { compact = false } = {}) {
  const cur = `<span class="plan-price__cur">${esc(currency.symbol)}</span>`;
  const amount = p.monthly != null ? `<strong>${esc(moneyNumber(p.monthly))}</strong>` : '<strong class="ph">[Monthly price]</strong>';
  const annual = p.annual != null ? esc(money(p.annual)) : `${esc(currency.symbol)}<span class="ph">[Annual price]</span>`;
  return `<div class="plan-price${p.monthly == null ? ' is-pending' : ''}">
    <p class="plan-price__main">${cur}${amount}<span class="plan-price__per">/month</span></p>
    <p class="plan-price__annual">Billed annually at ${annual}/year.</p>
    ${compact ? '' : '<p class="plan-price__fine">Monthly-equivalent rate. Payment is collected annually.</p>'}
  </div>`;
}

/* ---------- full plan card ---------- */
function featureBlock(p) {
  const summary = p.pendingCount === 0
    ? `${p.includedCount} of ${p.total} features included`
    : '[Feature allocation to be confirmed]';
  const top = p.included.slice(0, 6);
  const more = p.included.length - top.length;
  let list;
  if (top.length) {
    list = `<ul class="plan-feats">${top.map((f) => `<li>${icon('LuCheck', 16)}<span>${esc(f.name)}</span></li>`).join('')}</ul>
      ${more > 0 ? `<p class="plan-feats__more">+ ${more} more in the <a href="#compare" data-compare-plan="${esc(p.id)}">comparison</a></p>` : ''}
      ${p.pendingCount > 0 ? `<p class="plan-feats__pending">${p.pendingCount} ${p.pendingCount === 1 ? 'feature is' : 'features are'} still to be confirmed.</p>` : ''}`;
  } else {
    list = `<p class="plan-feats__pending">${icon('LuInfo', 16)}<span>[Key included features – to be confirmed in src/data/pricing.js]</span></p>`;
  }
  return `<div class="plan-card__feats"><p class="plan-card__sum">${esc(summary)}</p>${list}</div>`;
}

function planCard(p) {
  return `<article class="plan-card${p.highlighted ? ' plan-card--hi' : ''}" id="plan-${esc(p.id)}" aria-labelledby="plan-${esc(p.id)}-name" data-reveal>
    ${p.badge ? `<p class="plan-card__badge">${esc(p.badge)}</p>` : ''}
    <h4 id="plan-${esc(p.id)}-name">${esc(p.name)}</h4>
    ${p.subtitle ? `<p class="plan-card__sub">${esc(p.subtitle)}</p>` : ''}
    <p class="plan-card__target">${icon('LuStore', 16)}<span>${esc(p.target)}</span></p>
    <p class="plan-card__desc">${esc(p.description)}</p>
    ${priceBlock(p)}
    ${featureBlock(p)}
    <a class="btn ${p.highlighted ? 'btn--primary' : 'btn--secondary'} btn--block" href="${planUrl(p)}" aria-label="Request the ${esc(p.name)} plan">Request This Plan</a>
  </article>`;
}

export function planCards() {
  const groups = planGroups.filter((g) => g.plans.length).map((g) => `<div class="plan-group plan-group--${esc(g.id)}" role="group" aria-labelledby="pg-${esc(g.id)}">
    <div class="plan-group__head" data-reveal><h3 id="pg-${esc(g.id)}">${esc(g.title)}</h3><p>${esc(g.blurb)}</p></div>
    <div class="plan-grid plan-grid--${g.plans.length}">${g.plans.map(planCard).join('')}</div>
  </div>`).join('');
  return `${groups}
  <p class="plan-footnote" data-reveal>All plans are shown as a monthly-equivalent rate with payment collected annually. StitchNXT is Windows desktop software.</p>`;
}

/* ---------- comparison table ---------- */
function cell(p, f) {
  const v = p.values[f.id];
  const attrs = `data-col="${esc(p.id)}"`;
  if (v === true) return `<td ${attrs} class="cell cell--yes"><span class="cell__ico" aria-hidden="true">${icon('LuCheck', 18)}</span><span class="sr-only">Included</span></td>`;
  if (v === false) return `<td ${attrs} class="cell cell--no"><span class="cell__ico" aria-hidden="true">${icon('LuMinus', 18)}</span><span class="sr-only">Not included</span></td>`;
  return `<td ${attrs} class="cell cell--tbc"><span class="cell__tbc" aria-hidden="true">TBC</span><span class="sr-only">To be confirmed</span></td>`;
}

function featureRow(f) {
  const tip = f.hint ? `<button type="button" class="tip" data-tip="${esc(f.hint)}" aria-label="About ${esc(f.name)}: ${esc(f.hint)}">${icon('LuInfo', 15)}</button>` : '';
  return `<tr><th scope="row" class="compare__feat"><span>${esc(f.name)}</span>${tip}</th>${plans.map((p) => cell(p, f)).join('')}</tr>`;
}

export function comparison() {
  const anyTbc = plans.some((p) => p.pendingCount > 0);
  const head = plans.map((p) => `<th scope="col" data-col="${esc(p.id)}" class="compare__plan${p.highlighted ? ' is-hi' : ''}">
      <button type="button" data-plan-col="${esc(p.id)}" aria-pressed="false" title="Highlight this plan"><span>${esc(p.name)}</span>${p.subtitle ? `<small>${esc(p.subtitle)}</small>` : ''}</button></th>`).join('');
  const body = featureGroups.map((g) => `<tr class="compare__group" data-group-row><th scope="colgroup" colspan="${plans.length + 1}">${esc(g.title)}</th></tr>
    ${g.features.map(featureRow).join('')}`).join('');
  const foot = plans.map((p) => `<td data-col="${esc(p.id)}"><a class="btn btn--sm ${p.highlighted ? 'btn--primary' : 'btn--secondary'}" href="${planUrl(p)}" aria-label="Request the ${esc(p.name)} plan">Request</a></td>`).join('');
  return `<div class="compare-root" data-compare-root>
    <div class="compare-controls" role="group" aria-label="Show plans in the comparison">
      <button type="button" class="chip is-active" data-plan-filter="all" aria-pressed="true">All plans</button>
      ${plans.map((p) => `<button type="button" class="chip" data-plan-filter="${esc(p.id)}" aria-pressed="false">${esc(p.name)}</button>`).join('')}
    </div>
    <p class="compare-status" role="status" aria-live="polite" data-compare-status>Showing all ${plans.length} plans. Select a plan name in the table to highlight its column.</p>
    <ul class="compare-legend" aria-label="Legend">
      <li><span class="cell__ico cell__ico--yes">${icon('LuCheck', 16)}</span> Included</li>
      <li><span class="cell__ico cell__ico--no">${icon('LuMinus', 16)}</span> Not included</li>
      ${anyTbc ? '<li><span class="cell__tbc">TBC</span> To be confirmed</li>' : ''}
    </ul>
    <div class="compare-wrap" tabindex="0" role="region" aria-label="Plan feature comparison table, scrollable">
      <table class="compare">
        <caption class="sr-only">Feature comparison of the ${plans.length} StitchNXT subscription plans</caption>
        <thead><tr><th scope="col" class="compare__corner">Features</th>${head}</tr></thead>
        <tbody>${body}</tbody>
        <tfoot><tr><th scope="row" class="compare__feat">Ready to choose?</th>${foot}</tr></tfoot>
      </table>
    </div>
  </div>`;
}

/* ---------- notices ---------- */
export function pricingNotice() {
  if (site.pricingReviewed) return '';
  return `<div class="container"><div class="draft-banner draft-banner--pricing" role="note">${icon('LuTriangleAlert', 22)}<p><strong>Preview – not final.</strong> ${status.complete ? 'Prices and feature allocation are entered and waiting for your approval.' : status.pricesConfirmed ? 'Prices are entered, but the feature allocation for each plan has not been confirmed yet, so features show as &quot;to be confirmed&quot;.' : 'Prices and feature allocation have not been confirmed yet, so placeholders are shown.'} Once approved, set <code>pricingReviewed: true</code> in <code>src/config/site.js</code> to publish.</p></div></div>`;
}

/* ---------- homepage preview ---------- */
export function homePricingPreview() {
  return `<section class="section section--grey" id="plans" aria-labelledby="plans-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Pricing', title: 'Plans Designed for <span class="accent">Your Business.</span>', text: 'Choose the right StitchNXT solution for your tailoring, fabric or garment business.' }).replace('<h2>', '<h2 id="plans-title">')}
    ${planGroups.filter((g) => g.plans.length).map((g) => `<div class="plan-mini-group" role="group" aria-labelledby="hg-${esc(g.id)}">
      <h3 class="plan-mini-group__title" id="hg-${esc(g.id)}">${esc(g.title)}</h3>
      <div class="plan-mini-row">
      ${g.plans.map((p) => `<article class="plan-mini${p.highlighted ? ' plan-mini--hi' : ''}" data-reveal>
        ${p.badge ? `<p class="plan-card__badge">${esc(p.badge)}</p>` : ''}
        <h4>${esc(p.name)}</h4>
        ${p.subtitle ? `<p class="plan-card__sub">${esc(p.subtitle)}</p>` : ''}
        <p class="plan-mini__target">${esc(p.target)}</p>
        ${priceBlock(p, { compact: true })}
        <a class="btn btn--secondary btn--sm btn--block" href="/pricing/#plan-${esc(p.id)}" aria-label="View the ${esc(p.name)} plan">View Plan</a>
      </article>`).join('')}
      </div>
    </div>`).join('')}
    <div class="center-cta" data-reveal>${btn('Compare All Plans', '/pricing/#compare', 'primary', { iconRight: 'LuArrowRight' })}</div>
  </div>
</section>`;
}
