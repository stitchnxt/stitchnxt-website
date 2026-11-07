/**
 * Turns the raw client list into everything the website needs:
 * visible clients, geographic regions, map locations, statistics, logo lookup.
 * You normally never edit this file — edit src/data/clients.js instead.
 */
import fs from 'node:fs';
import path from 'node:path';
import rawClients from './clients.js';
import locationTable from './locations.js';

const ROOT = path.resolve(import.meta.dirname, '../..');
const LOGO_DIR = path.join(ROOT, 'public/assets/clients');
const EXTS = ['png', 'jpg', 'jpeg', 'webp', 'svg'];

export const REGIONS = {
  gujarat: { label: 'Gujarat', heading: 'Our Clients Across Gujarat' },
  india: { label: 'Other States', heading: 'Expanding Across India' },
  international: { label: 'International', heading: 'Beyond Borders' },
};
export const REGION_ORDER = ['gujarat', 'india', 'international'];

export const warnings = [];
const clean = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
export const slug = (s) => clean(s).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export function deriveRegion(c) {
  if (c.country.toLowerCase() !== 'india') return 'international';
  return c.state.toLowerCase() === 'gujarat' ? 'gujarat' : 'india';
}

const STOP = new Set(['the', 'by', 'and', 'of', 'for']);
export function makeInitials(name) {
  const words = name.replace(/[^\p{L}\p{N}\s-]/gu, '').split(/[\s-]+/).filter((w) => w && !STOP.has(w.toLowerCase()));
  if (!words.length) return '?';
  if (/^[A-Z]{2,3}$/.test(words[0])) return words[0]; // e.g. "RK Garments" → RK
  return (words[0][0] + (words[1] ? words[1][0] : '')).toUpperCase();
}

function findLogo(c) {
  if (c.logo) {
    const f = c.logo.replace(/^\/?(assets\/clients\/)?/, '');
    if (fs.existsSync(path.join(LOGO_DIR, f))) return `/assets/clients/${f}`;
    warnings.push(`Logo file not found for "${c.name}": public/assets/clients/${f}`);
    return '';
  }
  for (const ext of EXTS) {
    if (fs.existsSync(path.join(LOGO_DIR, `${slug(c.name)}.${ext}`))) return `/assets/clients/${slug(c.name)}.${ext}`;
  }
  return '';
}

/* ---- normalise + validate ---- */
const seenIds = new Set();
const all = rawClients.map((r, i) => {
  const c = {
    id: r.id || `client-${String(i + 1).padStart(3, '0')}`,
    name: clean(r.name), area: clean(r.area), city: clean(r.city), state: clean(r.state), country: clean(r.country),
    businessType: clean(r.businessType), description: clean(r.description), initials: clean(r.initials),
    showOnWebsite: r.showOnWebsite !== false, logoRaw: clean(r.logo), coordinates: r.coordinates || {},
  };
  if (!c.name || !c.country) warnings.push(`Client #${i + 1} (${c.id}) needs a name and a country — skipped.`);
  if (seenIds.has(c.id)) warnings.push(`Duplicate client id: ${c.id}`);
  seenIds.add(c.id);
  if (r.region && r.region !== deriveRegion(c)) warnings.push(`${c.id} "${c.name}": region "${r.region}" ignored; location says "${deriveRegion(c)}".`);
  return c;
}).filter((c) => c.name && c.country);

export const visible = all.filter((c) => c.showOnWebsite).map((c) => ({
  ...c,
  region: deriveRegion(c),
  locKey: [c.city, c.state, c.country].join('|'),
  locSlug: slug(c.city ? `${c.city}-${c.state}-${c.country}` : c.country),
  logo: findLogo({ name: c.name, logo: c.logoRaw }),
  initials: c.initials || makeInitials(c.name),
}));
visible.sort((a, b) =>
  REGION_ORDER.indexOf(a.region) - REGION_ORDER.indexOf(b.region) ||
  a.state.localeCompare(b.state) || a.city.localeCompare(b.city) || a.name.localeCompare(b.name) || a.area.localeCompare(b.area));

export const hiddenCount = all.length - visible.length;
export const hasClients = visible.length > 0;

/* ---- one map location per city (country-level when city unknown) ---- */
const locMap = new Map();
for (const c of visible) {
  let l = locMap.get(c.locKey);
  if (!l) {
    const t = locationTable[c.locKey];
    const own = c.coordinates && c.coordinates.latitude != null && c.coordinates.longitude != null ? { lat: c.coordinates.latitude, lng: c.coordinates.longitude } : null;
    const pos = t || own;
    l = { key: c.locSlug, city: c.city, state: c.state, country: c.country, region: c.region, count: 0, lat: pos?.lat ?? null, lng: pos?.lng ?? null, precision: t?.precision || 'city' };
    if (!pos) warnings.push(`No coordinates for "${c.city || c.country}" — listed in the directory but NOT shown on the map. Add it to src/data/locations.js.`);
    locMap.set(c.locKey, l);
  }
  l.count++;
}
export const locations = [...locMap.values()].sort((a, b) =>
  REGION_ORDER.indexOf(a.region) - REGION_ORDER.indexOf(b.region) || b.count - a.count || a.city.localeCompare(b.city));
export const mappable = locations.filter((l) => l.lat != null);

export const groups = REGION_ORDER.map((r) => ({ region: r, ...REGIONS[r], clients: visible.filter((c) => c.region === r) })).filter((g) => g.clients.length);

/* ---- statistics, always computed from the visible client data ---- */
const distinct = (arr) => new Set(arr.filter(Boolean)).size;
export const stats = {
  clients: visible.length,
  cities: distinct(visible.map((c) => c.city && `${c.city}|${c.state}|${c.country}`)),
  states: distinct(visible.filter((c) => c.country.toLowerCase() === 'india').map((c) => c.state)),
  countries: distinct(visible.map((c) => c.country.toLowerCase())),
};

/* ---- helper: which brands still need a logo (written to clients-logo-checklist.txt by the build) ---- */
export function logoChecklist() {
  const byBrand = new Map();
  for (const c of visible) {
    const b = byBrand.get(slug(c.name)) || { name: c.name, n: 0, has: false, slug: slug(c.name) };
    b.n++; b.has = b.has || !!c.logo; byBrand.set(slug(c.name), b);
  }
  return [...byBrand.values()].sort((a, b) => a.name.localeCompare(b.name));
}
