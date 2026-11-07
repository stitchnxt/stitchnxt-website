/* StitchNXT site behaviour — plain JavaScript, no dependencies. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Header: compact on scroll ---------- */
  const header = $('[data-header]');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = $('[data-nav-toggle]');
  const menu = $('[data-mobile-menu]');
  if (toggle && menu) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('is-open')) { setOpen(false); toggle.focus(); } });
    window.matchMedia('(min-width: 1280px)').addEventListener('change', (e) => e.matches && setOpen(false));
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else reveals.forEach((el) => el.classList.add('is-in'));

  /* ---------- FAQ accordion ---------- */
  $$('[data-faq]').forEach((faq) => {
    faq.addEventListener('click', (e) => {
      const q = e.target.closest('.faq__q');
      if (!q) return;
      const open = q.getAttribute('aria-expanded') !== 'true';
      q.setAttribute('aria-expanded', String(open));
      q.closest('.faq__item').classList.toggle('is-open', open);
    });
  });

  /* ---------- Gallery filters ---------- */
  $$('[data-gallery]').forEach((g) => {
    const chips = $$('[data-filter]', g);
    const items = $$('.gallery__grid > li', g);
    const empty = $('.gallery__empty', g);
    chips.forEach((c) => c.addEventListener('click', () => {
      const f = c.dataset.filter;
      chips.forEach((x) => { const on = x === c; x.classList.toggle('is-active', on); x.setAttribute('aria-pressed', String(on)); });
      let shown = 0;
      items.forEach((li) => { const show = f === 'all' || li.dataset.cat === f; li.hidden = !show; if (show) shown++; });
      if (empty) empty.hidden = shown > 0;
    }));
  });

  /* ---------- Lightbox ---------- */
  const dlg = $('[data-lightbox-dialog]');
  if (dlg) {
    const media = $('[data-lb-media]', dlg);
    const cap = $('[data-lb-caption]', dlg);
    let list = [], idx = 0, opener = null;
    const visibleButtons = (g) => $$('.gallery__grid > li:not([hidden]) [data-lightbox]', g);
    const show = () => {
      const b = list[idx];
      media.innerHTML = '<div class="shot-frame">' + $('.shot-frame', b).innerHTML + '</div>';
      const t = $('figcaption strong', b.closest('figure'));
      cap.textContent = t ? t.textContent : '';
      const multi = list.length > 1;
      $('[data-lb-prev]', dlg).hidden = !multi; $('[data-lb-next]', dlg).hidden = !multi;
    };
    const open = (btn) => {
      const g = btn.closest('[data-gallery]');
      list = g ? visibleButtons(g) : [btn];
      idx = Math.max(0, list.indexOf(btn));
      opener = btn; show(); dlg.showModal();
    };
    const step = (d) => { idx = (idx + d + list.length) % list.length; show(); };
    document.addEventListener('click', (e) => { const b = e.target.closest('[data-lightbox]'); if (b) open(b); });
    $('[data-lb-close]', dlg).addEventListener('click', () => dlg.close());
    $('[data-lb-prev]', dlg).addEventListener('click', () => step(-1));
    $('[data-lb-next]', dlg).addEventListener('click', () => step(1));
    dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.classList.contains('lightbox__inner')) dlg.close(); });
    dlg.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); });
    dlg.addEventListener('close', () => { media.innerHTML = ''; opener && opener.focus(); });
  }

  /* ---------- Clients: filters, directory and map ---------- */
  const cl = $('[data-clients]');
  if (cl) {
    const dataEl = $('#clients-data');
    let locs = [];
    try { locs = dataEl ? JSON.parse(dataEl.textContent) : []; } catch (e) { locs = []; }
    const cards = $$('.client-card', cl);
    const groups = $$('[data-group]', cl);
    const chips = $$('[data-region-filter]', cl);
    const pills = $$('[data-loc-pill]', cl);
    const statusEl = $('[data-status]', cl);
    const emptyEl = $('[data-empty]', cl);
    const resetBtn = $('[data-clients-reset]', cl);
    const state = { region: 'all', loc: null, expanded: new Set() };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pillByKey = Object.fromEntries(pills.map((p) => [p.dataset.locPill, p]));
    const labelOf = (key) => { const p = pillByKey[key]; return p ? p.firstChild.textContent.trim() : ''; };
    const regionName = { gujarat: 'Gujarat', india: 'other Indian states', international: 'international locations' };
    let mapApi = null;

    function apply() {
      const isDefault = state.region === 'all' && !state.loc;
      let shown = 0;
      cards.forEach((c) => {
        const ok = (state.region === 'all' || c.dataset.region === state.region) && (!state.loc || c.dataset.loc === state.loc);
        c.hidden = !ok; if (ok) shown++;
      });
      groups.forEach((g) => {
        const n = $$('.client-card:not([hidden])', g).length;
        g.hidden = n === 0;
        const collapsed = isDefault && g.dataset.collapsible === 'true' && !state.expanded.has(g.dataset.group);
        g.classList.toggle('is-collapsed', collapsed);
        const more = $('[data-more]', g);
        if (more) {
          more.hidden = !isDefault;
          more.setAttribute('aria-expanded', String(!collapsed));
          more.textContent = collapsed ? 'Show all ' + g.dataset.total + ' clients' : 'Show fewer';
        }
      });
      chips.forEach((c) => { const on = c.dataset.regionFilter === state.region; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', String(on)); });
      pills.forEach((p) => {
        p.hidden = state.region !== 'all' && p.dataset.region !== state.region;
        p.setAttribute('aria-pressed', String(p.dataset.locPill === state.loc));
      });
      emptyEl.hidden = shown > 0;
      resetBtn.hidden = isDefault;
      if (state.loc) statusEl.textContent = 'Showing ' + shown + (shown === 1 ? ' client' : ' clients') + ' in ' + labelOf(state.loc);
      else if (state.region !== 'all') statusEl.textContent = 'Showing ' + shown + (shown === 1 ? ' client' : ' clients') + ' in ' + regionName[state.region];
      else statusEl.textContent = 'Showing all ' + shown + ' client outlets';
      if (mapApi) mapApi.sync();
    }

    function setRegion(r) { state.region = r; state.loc = null; apply(); }
    function setLoc(key, fromMap) {
      state.loc = state.loc === key ? null : key;
      apply();
      if (fromMap && state.loc && window.matchMedia('(max-width: 979px)').matches) {
        $('[data-results]', cl).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      }
    }
    function reset() { state.region = 'all'; state.loc = null; state.expanded.clear(); apply(); }

    chips.forEach((c) => c.addEventListener('click', () => setRegion(c.dataset.regionFilter)));
    pills.forEach((p) => p.addEventListener('click', () => setLoc(p.dataset.locPill, false)));
    resetBtn.addEventListener('click', reset);
    groups.forEach((g) => {
      const more = $('[data-more]', g);
      if (more) more.addEventListener('click', () => {
        if (state.expanded.has(g.dataset.group)) state.expanded.delete(g.dataset.group); else state.expanded.add(g.dataset.group);
        apply();
      });
    });
    apply();

    /* ----- interactive map (Leaflet + OpenStreetMap, loaded only when the map nears the screen) ----- */
    const LEAFLET = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet';
    const mapEl = $('[data-map]', cl);
    const mapMsg = $('[data-map-msg]', cl);
    const loadLeaflet = () => new Promise((resolve, reject) => {
      if (window.L && window.L.map) return resolve(window.L);
      const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = LEAFLET + '.min.css'; document.head.appendChild(css);
      const s = document.createElement('script'); s.src = LEAFLET + '.min.js'; s.async = true;
      s.onload = () => (window.L && window.L.map ? resolve(window.L) : reject(new Error('Leaflet missing')));
      s.onerror = () => reject(new Error('Leaflet failed to load'));
      document.head.appendChild(s);
    });
    const esc = (t) => String(t).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

    function buildMap(L) {
      mapMsg.remove();
      const map = L.map(mapEl, { scrollWheelZoom: false, dragging: !L.Browser.mobile, zoomSnap: 0.5, minZoom: 3, maxZoom: 12, worldCopyJump: false });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 12, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors' }).addTo(map);
      const layer = L.layerGroup().addTo(map);
      const sizeOf = (n) => 28 + Math.min(24, Math.round(Math.sqrt(n) * 4.2));
      const clientsText = (n) => n + (n === 1 ? ' client' : ' clients');
      const zoomFor = (loc) => (loc.precision === 'country' ? 6 : 9);
      const inRegion = () => locs.filter((l) => state.region === 'all' || l.region === state.region);

      /* Nearby locations whose pins would overlap are merged into one count pin; clicking it zooms in. */
      function clusters() {
        const items = inRegion().map((l) => ({ l, pt: map.latLngToContainerPoint([l.lat, l.lng]), size: sizeOf(l.count) })).sort((a, b) => b.l.count - a.l.count);
        const out = [];
        items.forEach((it) => {
          const hit = out.find((c) => Math.hypot(c.pt.x - it.pt.x, c.pt.y - it.pt.y) < (c.size + it.size) / 2);
          if (hit) { hit.members.push(it.l); hit.count += it.l.count; hit.size = sizeOf(hit.count); }
          else out.push({ pt: it.pt, size: it.size, members: [it.l], count: it.l.count, lead: it.l });
        });
        return out;
      }

      function render() {
        layer.clearLayers();
        clusters().forEach((c) => {
          const single = c.members.length === 1;
          const loc = c.lead;
          const lat = c.members.reduce((a, m) => a + m.lat * m.count, 0) / c.count;
          const lng = c.members.reduce((a, m) => a + m.lng * m.count, 0) / c.count;
          const name = single ? (loc.city || loc.country) : c.members.length + ' locations';
          const title = name + ' — ' + clientsText(c.count);
          const marker = L.marker([lat, lng], {
            icon: L.divIcon({ className: 'pin-wrap' + (single ? '' : ' is-cluster'), html: '<span class="pin pin--' + loc.region + '"><b>' + c.count + '</b></span>', iconSize: [c.size, c.size], iconAnchor: [c.size / 2, c.size / 2] }),
            title: title, keyboard: true, riseOnHover: true, riseOffset: 20000,
          });
          let tip;
          if (single) {
            const where = loc.city ? (loc.region === 'international' ? loc.country : loc.state + ', ' + loc.country) : 'International';
            tip = '<strong>' + esc(name) + '</strong><span>' + esc(where) + '</span><em>' + clientsText(c.count) + '</em>';
          } else {
            tip = '<strong>' + c.members.length + ' locations · ' + clientsText(c.count) + '</strong>' +
              c.members.slice(0, 6).map((m) => '<span>' + esc(m.city || m.country) + ' · ' + m.count + '</span>').join('') +
              (c.members.length > 6 ? '<span>+ ' + (c.members.length - 6) + ' more</span>' : '') + '<em>Click to zoom in</em>';
          }
          marker.bindTooltip(tip, { direction: 'top', offset: [0, -c.size / 2], className: 'map-tip' });
          marker.on('click', () => {
            if (single) setLoc(loc.key, true);
            else map.fitBounds(L.latLngBounds(c.members.map((m) => [m.lat, m.lng])).pad(0.4), { maxZoom: 12 });
          });
          layer.addLayer(marker);
          const el = marker.getElement && marker.getElement();
          if (el) {
            el.classList.toggle('is-active', single && state.loc === loc.key);
            el.classList.toggle('is-dim', !!state.loc && !c.members.some((m) => m.key === state.loc));
          }
        });
      }

      let first = true;
      map.on('zoomend', render);
      mapApi = {
        sync() {
          const here = inRegion();
          if (!here.length) { layer.clearLayers(); return; }
          const sel = state.loc && locs.find((l) => l.key === state.loc);
          const animate = !first && !reduce; first = false;
          if (sel) map.setView([sel.lat, sel.lng], zoomFor(sel), { animate });
          else if (here.length === 1) map.setView([here[0].lat, here[0].lng], zoomFor(here[0]), { animate });
          else map.fitBounds(L.latLngBounds(here.map((l) => [l.lat, l.lng])).pad(0.3), { animate, maxZoom: 9 });
          render();
        },
      };
      mapApi.sync();
    }

    const startMap = () => loadLeaflet().then(buildMap).catch(() => {
      if (mapMsg) mapMsg.textContent = 'The interactive map could not be loaded right now. You can still explore our clients by location using the list below.';
    });
    if (locs.length && mapEl) {
      if ('IntersectionObserver' in window) {
        const mo = new IntersectionObserver((en) => { if (en[0].isIntersecting) { mo.disconnect(); startMap(); } }, { rootMargin: '400px 0px' });
        mo.observe(mapEl);
      } else startMap();
    } else if (mapMsg) mapMsg.textContent = 'Map unavailable.';
  }

  /* ---------- Pricing: comparison table (highlight / filter) ---------- */
  const cmp = $('[data-compare-root]');
  if (cmp) {
    const table = $('table', cmp);
    const chips = $$('[data-plan-filter]', cmp);
    const heads = $$('[data-plan-col]', cmp);
    const statusEl = $('[data-compare-status]', cmp);
    const cols = [...new Set($$('thead [data-col]', table).map((e) => e.dataset.col))];
    const names = Object.fromEntries(heads.map((b) => [b.dataset.planCol, $('span', b).textContent]));
    const st = { only: 'all', hl: null };
    function applyCompare() {
      $$('[data-col]', table).forEach((e) => {
        e.hidden = st.only !== 'all' && e.dataset.col !== st.only;
        e.classList.toggle('is-hl', st.hl === e.dataset.col);
      });
      const visible = st.only === 'all' ? cols.length : 1;
      $$('[data-group-row] th', table).forEach((th) => { th.colSpan = visible + 1; });
      chips.forEach((c) => { const on = c.dataset.planFilter === st.only; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', String(on)); });
      heads.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.planCol === st.hl)));
      cmp.classList.toggle('is-filtered', st.only !== 'all');
      statusEl.textContent = st.only !== 'all' ? 'Showing the ' + names[st.only] + ' plan only.'
        : st.hl ? 'Showing all ' + cols.length + ' plans. ' + names[st.hl] + ' is highlighted.'
        : 'Showing all ' + cols.length + ' plans. Select a plan name in the table to highlight its column.';
    }
    chips.forEach((c) => c.addEventListener('click', () => { st.only = c.dataset.planFilter; if (st.only !== 'all') st.hl = null; applyCompare(); }));
    heads.forEach((b) => b.addEventListener('click', () => { st.hl = st.hl === b.dataset.planCol ? null : b.dataset.planCol; st.only = 'all'; applyCompare(); }));
    $$('[data-compare-plan]').forEach((a) => a.addEventListener('click', () => { st.only = 'all'; st.hl = a.dataset.comparePlan; applyCompare(); }));
    applyCompare();
  }

  /* ---------- Enquiry form ---------- */
  const form = $('#enquiry-form');
  if (form) {
    const status = $('#form-status');
    /* "Request This Plan" links arrive as /contact/?plan=<id>#enquiry and pre-select that plan */
    const planSel = form.elements.plan;
    const planNote = $('[data-plan-note]');
    const showPlan = () => {
      if (!planNote) return;
      const v = planSel && planSel.value;
      planNote.hidden = !v || v === 'Not sure yet';
      if (!planNote.hidden) $('span', planNote).textContent = 'Selected plan: ' + v;
    };
    if (planSel) {
      let q = '';
      try { q = new URLSearchParams(window.location.search).get('plan') || ''; } catch (e) { q = ''; }
      const opt = q && [...planSel.options].find((o) => o.dataset.planId === q);
      if (opt) planSel.value = opt.value;
      planSel.addEventListener('change', showPlan);
      showPlan();
    }
    const say = (msg, kind) => { status.textContent = msg; status.className = 'form-status is-' + kind; status.focus(); };
    const rules = {
      fullName: (v) => (v.trim().length < 2 ? 'Please enter your full name.' : ''),
      businessName: (v) => (v.trim().length < 2 ? 'Please enter your business name.' : ''),
      businessType: (v) => (!v ? 'Please select a business type.' : ''),
      mobile: (v) => (v.replace(/\D/g, '').length < 8 || !/^[\d\s+()-]+$/.test(v) ? 'Please enter a valid mobile number.' : ''),
      email: (v) => (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Please enter a valid email address.' : ''),
    };
    const check = (name) => {
      const el = form.elements[name]; if (!el || !rules[name]) return true;
      const msg = rules[name](el.value);
      el.closest('.field').classList.toggle('is-invalid', !!msg);
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (msg) el.setAttribute('aria-describedby', name + '-err'); else el.removeAttribute('aria-describedby');
      $('#' + name + '-err').textContent = msg;
      return !msg;
    };
    Object.keys(rules).forEach((n) => form.elements[n].addEventListener('blur', () => check(n)));

    /* ================= FORM DELIVERY =================
       Configured in src/config/site.js. Tried in this order:
       1) data-endpoint  → POST JSON to your form service / backend
       2) data-whatsapp  → open WhatsApp with the enquiry pre-filled
       3) data-email     → open the visitor's email app with the enquiry
       If none is configured, nothing is sent and the visitor is told so. */
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const ok = Object.keys(rules).map(check).every(Boolean);
      if (!ok) { const bad = $('.is-invalid input, .is-invalid select', form); bad && bad.focus(); return; }
      const d = Object.fromEntries(new FormData(form).entries());
      if (d.website) return; // honeypot: bots only
      const lines = [
        'StitchNXT demo enquiry',
        'Name: ' + d.fullName, 'Business: ' + d.businessName, 'Business type: ' + d.businessType,
        'Plan: ' + (d.plan || '-'), 'Mobile: ' + d.mobile, 'Email: ' + (d.email || '-'), 'City: ' + (d.city || '-'), 'Message: ' + (d.message || '-'),
      ].join('\n');
      const { endpoint, whatsapp, email } = form.dataset;
      try {
        if (endpoint) {
          const btn = form.querySelector('button[type=submit]'); btn.disabled = true;
          const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(d) });
          btn.disabled = false;
          if (!res.ok) throw new Error('bad status');
          form.reset(); say('Thank you! Your enquiry has been sent. We will get in touch soon.', 'ok');
        } else if (whatsapp) {
          window.open('https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(lines), '_blank', 'noopener');
          say('WhatsApp has been opened with your enquiry. Please press send there to complete it.', 'info');
        } else if (email) {
          window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent('StitchNXT demo enquiry') + '&body=' + encodeURIComponent(lines);
          say('Your email app has been opened with your enquiry. Please press send to complete it.', 'info');
        } else {
          say('Thanks for your interest. This form is not connected to a delivery method yet, so your details have not been sent. Please use the contact details on this page.', 'info');
        }
      } catch (err) {
        form.querySelector('button[type=submit]').disabled = false;
        say('Sorry, we could not send your enquiry. Please try again or contact us directly.', 'err');
      }
    });
  }
})();
