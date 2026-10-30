# AlunUÉ Refill

HCI proposal and working browser prototype for trusted refill discovery during a University of Évora student's day. Research phase first; a real refill directory and partner network do not yet exist.

## Run and check

No package installation or API keys are needed. Serve `dist/` with any static HTTP server. Run `npm test` and `npm run check` with Node 20+. A secure HTTPS origin is needed for installability, service workers, geolocation and some share/clipboard features. Opening `index.html` from a ZIP using `file://` is not a supported launch method because ES modules need HTTP.

The main screens are Discover, My journey, Refill community and The project. Demonstration places are synthetic and labelled. Overpass map candidates are never automatically certified as potable/free/accessible/working. No unverified real water point can be added to a journey. Grocery and cultural stops are optional.

## Delivery

- `dist/`: deployable responsive app and public project/API notes.
- `docs/`: research, course mapping, decision log and release guidance.
- `tests/`: meaningful checks for water trust, route completeness and API failure handling.
- `scripts/check.mjs`: local-link and manifest checks.

The application has no application account, paid API dependency, backend, partner signup server, analytics or automatic messages. Public endpoints are best-effort and can block browser requests. Browser rendering, installation and live CORS need device verification before making product claims. The private hosted preview has a separate owner sign-in gate.

## Course fit and submission status

The retained brief is AlunUÉ: user-centred redesign of UÉ student life. Position this concept as the campus mobility/essential-services module, subject to group and instructor scope agreement. Phase 1 is a research report, not a demand for a production APK. The retained brief calls for real UÉ research, at least three personas, usability requirements/main tasks, empathy maps, journey maps and HTA, with a maximum ten-page report.

Research records are unavailable; founder recollections are exploratory evidence. Proto-personas are hypotheses, not interview findings. Do not claim a completed study, verified water inventory or submitted report. See `docs/research-and-submission.md`.

## Licensing

Third-party data retains its own terms. OpenStreetMap data: ODbL with attribution; Open-Meteo data: CC BY 4.0, with the relevant service plan terms; Wikipedia: linked page/source terms. No Google map tiles are redistributed. No street tiles are bulk-downloaded or cached. New project code has no open-source licence assigned yet; the owner should choose one before advertising reuse rights.
