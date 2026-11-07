/**
 * MAP COORDINATES for client locations — city-level only (never shop addresses).
 * Key format:  'City|State|Country'   (leave a part empty when unknown).
 * These are the published geographic positions of each city centre; nothing is guessed.
 *
 * Adding a client in a NEW city? Add one line here (latitude, longitude of the city centre),
 * or put `coordinates: { latitude, longitude }` on that client in clients.js.
 * A city with no coordinates still appears in the directory, but gets no map marker
 * (the build prints a warning) — it is never placed at a made-up position.
 *
 * precision: 'city' (default) or 'country' (used when the client's city is not known).
 */
const locations = {
  'Ahmedabad|Gujarat|India':   { lat: 23.0225, lng: 72.5714 },
  'Gandhinagar|Gujarat|India': { lat: 23.2156, lng: 72.6369 },
  'Himatnagar|Gujarat|India':  { lat: 23.5980, lng: 72.9660 },
  'Surat|Gujarat|India':       { lat: 21.1702, lng: 72.8311 },
  'Vadodara|Gujarat|India':    { lat: 22.3072, lng: 73.1812 },
  'Vapi|Gujarat|India':        { lat: 20.3717, lng: 72.9049 },
  'Chittorgarh|Rajasthan|India': { lat: 24.8887, lng: 74.6269 },
  'Bharatpur|Rajasthan|India':   { lat: 27.2173, lng: 77.4895 },
  'Jaipur|Rajasthan|India':      { lat: 26.9124, lng: 75.7873 },
  'Sangli|Maharashtra|India':    { lat: 16.8524, lng: 74.5815 },
  // City not supplied for this client, so the marker sits at country level (centre of Malaysia), not at a guessed city.
  '||Malaysia': { lat: 4.2105, lng: 101.9758, precision: 'country' },
};

export default locations;
