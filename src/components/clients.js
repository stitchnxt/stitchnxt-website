/** "Our Clients & Presence" homepage section. All data comes from src/data/clients.js. */
import site from '../config/site.js';
import { esc, icon } from './ui.js';
import { groups, locations, mappable, stats, visible, REGIONS, REGION_ORDER } from '../data/clientsModel.js';

const PREVIEW = 8; // cards shown per group before "Show all" (only when a group is longer than this)

function locationText(c) {
  if (c.region === 'international') return [c.city, c.country].filter(Boolean).join(', ');
  if (c.region === 'india') return [c.city, c.state].filter(Boolean).join(', ');
  return c.city;
}

function card(c, extra) {
  const mark = c.logo
    ? `<img src="${esc(c.logo)}" alt="${esc(c.name)} logo" width="56" height="56" loading="lazy" decoding="async">`
    : `<span aria-hidden="true">${esc(c.initials)}</span>`;
  const area = site.showClientArea && c.area && c.area !== c.city ? `<span class="client-card__area">${esc(c.area)}</span>` : '';
  return `<li class="client-card client-card--${c.region}" data-region="${c.region}" data-loc="${esc(c.locSlug)}"${extra ? ' data-extra' : ''}>
    <article>
      <div class="client-card__mark${c.logo ? ' has-logo' : ''}">${mark}</div>
      <div class="client-card__body">
        <h4>${esc(c.name)}</h4>
        <p class="client-card__loc">${icon('LuMapPin', 15)}<span>${esc(locationText(c))}</span></p>
        ${area}
        ${c.businessType ? `<span class="client-card__type">${esc(c.businessType)}</span>` : ''}
        ${c.description ? `<p class="client-card__desc">${esc(c.description)}</p>` : ''}
      </div>
    </article>
  </li>`;
}

function group(g) {
  const collapsible = g.clients.length > PREVIEW;
  return `<div class="client-group client-group--${g.region}" data-group="${g.region}" data-collapsible="${collapsible}" data-total="${g.clients.length}">
    <div class="client-group__head">
      ${g.region === 'international' ? `<span class="client-group__ico">${icon('LuMapPin', 18)}</span>` : ''}
      <h3>${esc(g.heading)}</h3><span class="client-group__count">${g.clients.length}</span>
    </div>
    <ul class="client-grid">${g.clients.map((c, i) => card(c, collapsible && i >= PREVIEW)).join('')}</ul>
    ${collapsible ? `<button type="button" class="btn btn--secondary btn--sm client-group__more" data-more aria-expanded="false">Show all ${g.clients.length} clients</button>` : ''}
  </div>`;
}

function statsRow() {
  const items = [
    [stats.clients, 'Client outlets', 'LuStore'],
    [stats.cities, 'Cities covered', 'LuMapPin'],
    [stats.states, 'Indian states covered', 'LuLandmark'],
    [stats.countries, stats.countries === 1 ? 'Country covered' : 'Countries covered', 'LuBuilding2'],
  ].filter(([n]) => n > 0); // never show a statistic the data cannot support
  return `<ul class="clients-stats" data-reveal>${items.map(([n, l]) => `<li class="stat"><span class="stat__num">${n}</span><span class="stat__label">${l}</span></li>`).join('')}</ul>`;
}

export function clientsSection() {
  if (!visible.length) return '';
  const counts = Object.fromEntries(REGION_ORDER.map((r) => [r, visible.filter((c) => c.region === r).length]));
  const chips = [['all', 'All Clients', visible.length], ...REGION_ORDER.map((r) => [r, REGIONS[r].label, counts[r]])]
    .filter(([, , n]) => n > 0)
    .map(([k, l, n], i) => `<button type="button" class="chip${i === 0 ? ' is-active' : ''}" data-region-filter="${k}" aria-pressed="${i === 0}">${esc(l)} <span class="chip__n">${n}</span></button>`).join('');
  const pills = locations.map((l) => {
    const label = l.city || l.country;
    const sub = l.city ? '' : '';
    return `<button type="button" class="loc-pill loc-pill--${l.region}" data-loc-pill="${esc(l.key)}" data-region="${l.region}" aria-pressed="false">${esc(label)}${sub} <b>${l.count}</b></button>`;
  }).join('');
  const mapData = JSON.stringify(mappable.map(({ key, city, state, country, region, count, lat, lng, precision }) => ({ key, city, state, country, region, count, lat, lng, precision })))
    .replace(/</g, '\\u003c');
  return `<section class="section section--beige clients" id="clients" aria-labelledby="clients-title" data-clients>
  <div class="container">
    <div class="section-head is-center" data-reveal>
      <p class="eyebrow">Our Clients &amp; Presence</p>
      <h2 id="clients-title">Growing Together <span class="accent">with Our Clients.</span></h2>
      <p class="section-head__text">From different cities across Gujarat to various states in India and international locations, StitchNXT is helping tailoring, fabric and garment businesses manage their everyday operations.</p>
    </div>
    ${statsRow()}
    <div class="clients-toolbar" data-reveal>
      <div class="clients-filters" role="group" aria-label="Filter clients by location">${chips}</div>
      <button type="button" class="reset-btn" data-clients-reset hidden>${icon('LuX', 16)} Reset</button>
    </div>
    <p class="clients-status" role="status" aria-live="polite" data-status>Showing all ${visible.length} client outlets</p>
    <div class="clients-layout">
      <aside class="map-card" aria-label="Client locations map">
        <div class="client-map" id="clients-map" data-map>
          <p class="client-map__msg" data-map-msg>Loading map…</p>
        </div>
        <ul class="map-legend" aria-label="Map legend">
          <li><span class="pin pin--gujarat pin--sm"></span> Gujarat</li>
          <li><span class="pin pin--india pin--sm"></span> Other states</li>
          <li><span class="pin pin--international pin--sm"></span> International</li>
        </ul>
        <div class="map-card__locs">
          <h3 class="mini-title">Browse by location</h3>
          <div class="loc-list">${pills}</div>
        </div>
        <p class="map-note">Markers show cities only; exact shop addresses are not published.</p>
      </aside>
      <div class="clients-results" data-results>
        ${groups.map(group).join('')}
        <p class="clients-empty" data-empty hidden>No clients match this selection.</p>
      </div>
    </div>
    <script type="application/json" id="clients-data">${mapData}</script>
  </div>
</section>`;
}
