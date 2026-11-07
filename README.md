# StitchNXT Marketing Website

Static marketing website for **StitchNXT**, Windows desktop software for tailoring, fabric and garment businesses.
Plain HTML/CSS/JS output, no framework at runtime, so it loads fast and can be hosted anywhere.

## Quick start

```bash
npm install          # first time only
npm run build        # builds the site into /dist
npm run preview      # http://localhost:4173  (clean-URL preview server)
npm run check        # browser QA: console errors, overflow at 5 widths, broken links, titles, alt text
```

Publish the contents of `dist/` to any static host (Netlify, Cloudflare Pages, Vercel, GitHub Pages, cPanel, S3 …).
Set your real domain at build time so canonical URLs, Open Graph and the sitemap are correct:

```bash
SITE_URL=https://www.yourdomain.com npm run build
```

## Where to edit things

| I want to change… | Edit this file |
|---|---|
| Phone, email, WhatsApp, address, social links, form delivery | `src/config/site.js` |
| Replace placeholder screenshots with real ones | drop files in `public/assets/screenshots/`, set `file:` in `src/content/screenshots.js` |
| Add more screenshots later | append an entry in `src/content/screenshots.js` (gallery, Product Tour and lightbox update automatically) |
| Feature names, descriptions, benefits | `src/content/features.js` |
| Solutions page copy | `src/content/solutions.js` |
| FAQ answers | `src/content/faq.js` |
| Homepage section copy | `src/components/sections.js` |
| About / Contact / Privacy / Terms copy | `src/pages/*.js` |
| Colours, fonts, spacing | CSS variables at the top of `src/styles/main.css` |
| Clients (add / edit / hide) | `src/data/clients.js` (one line per client; `showOnWebsite: false` hides one without deleting) |
| Client logos | drop files in `public/assets/clients/` — exact file names are listed in `clients-logo-checklist.txt` (rewritten on every build) |
| Map coordinates for a new city | one line in `src/data/locations.js` |
| Logo | replace `public/assets/stitchnxt-logo.png`; favicon, Apple icon and social-share image regenerate on the next build |

## Before publishing — checklist

1. **Domain**: build with `SITE_URL=…` (see above).
2. **Contact details** in `src/config/site.js` (email, phone, WhatsApp, address, social). Empty values show a visible `[… add in site config]` placeholder. Setting the WhatsApp number also turns on the floating WhatsApp button and WhatsApp buttons.
3. **Enquiry form delivery** (`formEndpoint`, WhatsApp or email in `site.js`). Until one is set the form validates input but honestly tells the visitor it is not connected; it never pretends to send.
4. **Screenshots**: add real StitchNXT screenshots (1600×1000 px recommended). Until then, labelled placeholders are shown. Never substitute generated images.
5. **Privacy Policy and Terms** are draft placeholders marked noindex. Replace the text in `src/pages/legal.js` with approved legal content and set `legalReviewed: true`.
6. **Purchase FAQ answer** (`src/content/faq.js`) — confirm or edit the wording.
7. Optionally add industry photography to `public/assets/industry/`.

## Notes

- Fonts: Manrope is loaded from Google Fonts (with a system-font fallback). To self-host, download the font files and replace the `<link>` in `src/components/layout.js`.
- Clean URLs use folders (`/features/` → `features/index.html`). Most static hosts serve `/features` and `/features/` identically.
- Content rules followed: no invented testimonials, statistics, pricing, awards, integrations, cloud or mobile claims.

## Our Clients & Presence (homepage section)

- Everything comes from `src/data/clients.js`: cards, map pins, filters and the four statistics are all calculated from it at build time. Hidden clients (`showOnWebsite: false`) are left out of the page completely.
- Region is automatic: Gujarat, other Indian states, or international. Business type is blank because it was not supplied; fill it in per client and it will appear on the card.
- Statistics are labelled **Client outlets** (one per entry) because several names appear at more than one location. A statistic is hidden if its count would be zero.
- **Map**: Leaflet 1.9.4 (from cdnjs) with OpenStreetMap tiles, loaded only when the map nears the screen. No API key or paid service is needed. OpenStreetMap's tile server is meant for light use; for very high traffic, switch the tile URL in `src/scripts/main.js` to a provider you have an account with. If the map cannot load, the filters, location list and directory still work.
- Nearby cities are merged into one count pin on the map; clicking it zooms in. Markers show cities only, never shop addresses.
- Make sure you have permission to show each client's name and logo.
