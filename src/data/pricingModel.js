/**
 * Turns src/data/pricing.js into everything the pages need: validated feature values,
 * monthly/annual amounts, counts and "is this confirmed yet?" flags.
 * You normally never edit this file — edit src/data/pricing.js instead.
 */
import pricing from './pricing.js';

export const warnings = [];
export const currency = pricing.currency;
export const featureGroups = pricing.featureGroups;
export const allFeatures = featureGroups.flatMap((g) => g.features.map((f) => ({ ...f, group: g.id, groupTitle: g.title })));

const isMoney = (v) => typeof v === 'number' && Number.isFinite(v) && v > 0;
const round2 = (n) => Math.round(n * 100) / 100;

/** 11988 -> "11,988", 833.33 -> "833.33" (digits only, grouped for the configured locale). */
export function moneyNumber(n) {
  return new Intl.NumberFormat(currency.locale, { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }).format(n);
}
/** 11988 -> "₹11,988" */
export const money = (n) => `${currency.symbol}${moneyNumber(n)}`;

/** Monthly-equivalent and annual amounts. Annual = monthly x 12 unless a separate annualPrice is supplied. */
export function planPrices(plan) {
  let m = plan.monthlyPrice, a = plan.annualPrice;
  if (m != null && !isMoney(m)) { warnings.push(`Plan "${plan.name}": monthlyPrice must be a positive number or null — ignored.`); m = null; }
  if (a != null && !isMoney(a)) { warnings.push(`Plan "${plan.name}": annualPrice must be a positive number or null — ignored.`); a = null; }
  const annual = a != null ? a : m != null ? round2(m * 12) : null;
  const monthly = m != null ? m : a != null ? round2(a / 12) : null;
  return { monthly, annual, annualIsSeparate: a != null };
}

const seen = new Set();
export const plans = pricing.plans.map((p) => {
  if (seen.has(p.id)) warnings.push(`Duplicate plan id: ${p.id}`);
  seen.add(p.id);
  const prices = planPrices(p);
  const values = {};
  for (const f of allFeatures) {
    const v = p.features?.[f.id];
    if (v === true || v === false || v === null) values[f.id] = v;
    else {
      values[f.id] = null;
      warnings.push(`Plan "${p.name}", feature "${f.name}": value must be true, false or null${v === undefined ? ' (missing)' : ''} — treated as not confirmed.`);
    }
  }
  for (const k of Object.keys(p.features || {})) if (!allFeatures.some((f) => f.id === k)) warnings.push(`Plan "${p.name}": unknown feature id "${k}" ignored.`);
  const included = allFeatures.filter((f) => values[f.id] === true);
  return {
    ...p, ...prices, values, included,
    includedCount: included.length,
    excludedCount: allFeatures.filter((f) => values[f.id] === false).length,
    pendingCount: allFeatures.filter((f) => values[f.id] === null).length,
    total: allFeatures.length,
  };
});

export const planGroups = pricing.planGroups.map((g) => ({ ...g, plans: plans.filter((p) => p.group === g.id) }));
for (const p of plans) if (!pricing.planGroups.some((g) => g.id === p.group)) warnings.push(`Plan "${p.name}": group "${p.group}" is not defined in planGroups.`);

export const status = {
  pricesConfirmed: plans.every((p) => p.monthly != null),
  featuresConfirmed: plans.every((p) => p.pendingCount === 0),
};
status.complete = status.pricesConfirmed && status.featuresConfirmed;

/** Build-time report of what is still missing, printed by build.mjs. */
export function pendingReport() {
  const out = [];
  const noPrice = plans.filter((p) => p.monthly == null).map((p) => p.name);
  if (noPrice.length) out.push(`Prices not set for: ${noPrice.join(', ')}`);
  const pend = plans.filter((p) => p.pendingCount > 0);
  if (pend.length) out.push(`Feature allocation not confirmed (null) — ${pend.map((p) => `${p.name}: ${p.pendingCount}/${p.total}`).join(' · ')}`);
  return out;
}
