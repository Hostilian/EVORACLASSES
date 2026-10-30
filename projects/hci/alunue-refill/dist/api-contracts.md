# API and capability contracts

Implemented means the adapter and visible control exist. It does not mean a live browser/CORS/device test has passed. No third-party secret keys are included.

| Integration | Implemented behaviour | Failure or trust boundary |
|---|---|---|
| OpenStreetMap / Overpass | User-triggered fixed Évora bounding-box query for drinking-water tags and supermarkets; POST interpreter endpoint; schema check and deduplication | 26s client timeout; no automatic retry storm; partial result with Overpass remark rejected; 24h snapshot; stale label on failure; map tags never establish safe/free/current access |
| Google Maps URLs | Walking directions, chosen coordinates/order, max 3 intermediate stops per mobile part, connected parts and one-leg links | No API key; browser/app fallback belongs to Maps; connectivity and walking-waypoint handling vary; itinerary text preserves every stop; no import into a saved custom Google My Maps layer is claimed |
| Open-Meteo | Évora fixed-location temperature/apparent temperature, button-triggered | 12s timeout; 30min snapshot; stale label; no medical heat assessment or route shading |
| Wikipedia/MediaWiki | Fixed centre geosearch within 3km; linked title/coordinates | 12s timeout; 7-day snapshot; no access/open-hours/price validation; no claim of best scenery |
| Browser geolocation | Explicit permission request, in-session location, straight-line distances and optional route start | 10s timeout; denied/unsupported fallback to centre, CLV or coordinates; no location history |
| Clipboard | Copy ordered itinerary and Maps links | HTTPS/permission dependent; save text fallback |
| Web Share | Share itinerary via user's own share sheet | Unsupported: copy/save; cancel is not an error; no automatic sending |
| Service Worker/Cache API | Same-origin allowlist for app shell, network-first then cache | HTTPS + first online visit required; no external API response interception, no tiles/offline navigation; retained browser storage not guaranteed |
| Local Storage | Preferences, itinerary IDs, local-only suggestions and versioned API snapshots | Quota/privacy error leaves session usable; save itinerary text; visible delete control; API module additionally has an in-memory fallback |
| PWA install | Manifest, SVG icon and optional install prompt | Browser and private-host compatibility needs verification; no APK binary |

## Data and trust

Water point fields should eventually include ID, coordinates, source link, potability evidence, free/no-purchase policy, working state, hours/access restrictions, check date and responsible verifier. Partner points also require explicit opt-in, how to pause and how to withdraw. The prototype has zero independently verified real water points and zero partner agreements. Synthetic demo points cannot enter a real-mode route.

Community-reported works/closed states are distinct from operator confirmation. A new failure report should hide a verified point pending review. Freshness expiry is future work; any operational launch must add it before allowing `checked` records. Community reports cannot certify water quality by tasting or appearance.

## Performance and offline boundaries

No external font, mapping library or map tiles are required for the main interface. A list is the primary accessible view; a user can open an external OSM map. API calls happen only on user action, with caching and explicit timestamp/error status. No paid provider failover is silently used. Offline storage covers the shell and earlier successful snapshots, not new searches, private-host authentication renewal, Google directions or an offline pedestrian map.

## Sensible future APIs

- A backend-managed walking API (for example a pedestrian-capable routing provider) after service terms, quotas and credentials are reviewed; never expose a private key in JavaScript.
- Municipal/University facilities inventory if an authoritative export exists; there is no confirmed inventory endpoint now.
- Official retailer store data if licensed; no scraping of live basket prices and no claim that every Lidl/Pingo Doce/Continente is cheapest.
- Opening-hours parser and audited accessibility attributes with unknown states preserved.
- Moodle/SIIUE integration only after an official supported authentication/permission path exists. No password scraping.

## Sources checked 30 October 2026

- https://wiki.openstreetmap.org/wiki/Overpass_API
- https://developers.google.com/maps/documentation/urls/guide
- https://open-meteo.com/en/docs
- https://www.mediawiki.org/wiki/API:Geosearch
- https://operations.osmfoundation.org/policies/tiles/ (no tile bulk download)
- https://www.openstreetmap.org/copyright

Public services have usage limits and no application uptime promise. Re-check commercial/service conditions before an operational launch.
