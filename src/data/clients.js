/**
 * ============================================================
 *  STITCHNXT CLIENT LIST  — the ONLY place client details live
 * ============================================================
 * To add a client: copy any line below and edit it. Then run `npm run build`.
 * Everything else (cards, map markers, filters, statistics) updates automatically.
 *
 * Fields
 *   name          required   Client / shop name as it should appear publicly.
 *   area          optional   Locality shown in small text (e.g. 'C.G. Road'). Never a street address.
 *   city          optional   Leave '' when only the country is known (map shows a country-level marker).
 *   state         optional   Indian state, e.g. 'Gujarat'.
 *   country       required   e.g. 'India', 'Malaysia'.
 *   businessType  optional   'Tailoring Shop' | 'Fabric Shop' | 'Garment Shop' | 'Combined Business'.
 *                            Not supplied yet, so it is blank and not shown. Fill in when confirmed.
 *   logo          optional   File name inside public/assets/clients/ (e.g. 'status-fashion.png').
 *                            If omitted, the site automatically looks for  public/assets/clients/<name-slug>.png|jpg|webp|svg
 *                            (see clients-logo-checklist.txt, created on every build, for the exact file names).
 *                            Outlets with the same name share one logo file. No logo → initials placeholder.
 *   initials      optional   Override the automatic initials placeholder.
 *   description   optional   Short factual line. Shown only if you supply it.
 *   showOnWebsite optional   Set to false to hide a client everywhere without deleting the record. Default: true.
 *   coordinates   optional   { latitude, longitude } — only needed for a city missing from src/data/locations.js.
 *
 * Region is worked out automatically:
 *   Gujarat → "Our Clients Across Gujarat" · other Indian states → "Expanding Across India" · outside India → "Beyond Borders".
 *
 * PRIVACY: only business name, locality, city, state and country are used. Do not add phone numbers or street addresses.
 * Make sure you have permission to show each client's name and logo.
 */
const clients = [
  { id: 'client-001', name: 'Aastha Cloth and Tailor', area: 'New C.G. Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-002', name: 'Adani Creation', area: 'C.G. Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-003', name: 'Adani Creation', area: 'Sindhu Bhavan Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-004', name: 'A Lord & Company', area: 'Sindhu Bhavan Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-005', name: 'Darji - The Tailor Shop', area: 'South Bopal', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-006', name: 'Ethnix by Raymond', area: 'Opp. ITC Hotel', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-007', name: 'Kora By NM', area: 'S.G. Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-008', name: 'Krishna Cloth & Tailors', area: 'Bopal', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-009', name: 'Mangalam Designer Pvt Ltd', area: 'Nava Vadaj', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-010', name: 'Mourya Fashion Tailors', area: 'Sulpad Road', city: 'Vapi', state: 'Gujarat', country: 'India' },
  { id: 'client-011', name: 'Mourya-G Premium Fabric & Custom Tailoring', area: 'Morarji Circle Road', city: 'Vapi', state: 'Gujarat', country: 'India' },
  { id: 'client-012', name: 'New Mourya Tailor', area: 'Bhadakmora', city: 'Vapi', state: 'Gujarat', country: 'India' },
  { id: 'client-013', name: 'New India Tailors', area: 'Kidwai Nagar', city: 'Chittorgarh', state: 'Rajasthan', country: 'India' },
  { id: 'client-014', name: 'Pooja Kosti', area: 'Sindhu Bhavan Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-015', name: 'President Tailor Cloths', area: 'Gurukul Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-016', name: 'Prince Pride', area: 'Bharatpur', city: 'Bharatpur', state: 'Rajasthan', country: 'India' },
  { id: 'client-017', name: 'R.K. Garments', area: 'Shivranjani Cross Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-018', name: 'Retro Fashion', area: 'Vastrapur', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-019', name: 'Serenity - Reid & Taylor', area: 'C.G. Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-020', name: "Shreeji Men's Wear", area: 'Nizampura', city: 'Vadodara', state: 'Gujarat', country: 'India' },
  { id: 'client-021', name: 'Status Fashion', area: 'Motera', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-022', name: 'Status Fashion', area: 'Nilok', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-023', name: 'Status Fashion', area: 'Sindhu Bhavan Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-024', name: 'Status Fashion', area: 'Satellite Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-025', name: 'Steel Lifestyle', area: 'Satellite Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-026', name: 'Stitch World', area: 'Maple Tree', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-027', name: 'Stitch Point', area: 'C.G. Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-028', name: 'Stitching Story', area: 'Maple Tree', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-029', name: 'Stitching Story', area: 'Motera', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-030', name: 'The Raymond Shop', area: 'Kapad Peth', city: 'Sangli', state: 'Maharashtra', country: 'India' },
  { id: 'client-031', name: 'The Raymond Shop', area: 'Mirza Ismail Road', city: 'Jaipur', state: 'Rajasthan', country: 'India' },
  { id: 'client-032', name: 'The Raymond Shop', area: 'Bharatpur', city: 'Bharatpur', state: 'Rajasthan', country: 'India' },
  { id: 'client-033', name: 'The Raymond Shop', area: 'C.G. Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-034', name: 'The Raymond Shop', area: 'Paldi', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-035', name: 'The Raymond Shop', area: 'Science City Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-036', name: 'The Raymond Shop', area: 'Ghod Dod Road', city: 'Surat', state: 'Gujarat', country: 'India' },
  { id: 'client-037', name: 'The Stitching Studio', area: 'VIP Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-038', name: 'Tailors Point', area: 'S.G. Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-039', name: 'Tailors Point', area: 'C.G. Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-040', name: 'Tailors Point', area: 'Randensan', city: 'Gandhinagar', state: 'Gujarat', country: 'India' },
  { id: 'client-041', name: 'The Destiny Cloth Shop', area: 'Jodhpur Village', city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { id: 'client-042', name: 'White Collar By Sachin', area: 'Gandhi Road', city: 'Himatnagar', state: 'Gujarat', country: 'India' },
  { id: 'client-043', name: 'MasterPiece Tailor', area: '', city: '', state: '', country: 'Malaysia' },
];

export default clients;
