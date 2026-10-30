# AlunUÉ Refill: scope and delivery plan

## The recommendation

Start with a focused student-life task: find a trustworthy free refill and continue to a chosen destination. Treat scenic, grocery and opt-in shop stops as optional extensions. The core problem is uncertainty and discovery, not inventing another general map.

## Ranked paths

RICE comes from Intercom: Reach × Impact × Confidence ÷ Effort. Here effort is adapted to person-hours of remaining Phase 1 preparation, not a production build. These are judgement estimates, not measured demand, grade forecasts or execution promises. A common hypothetical pilot of 30 students makes the comparison consistent; it is NOT the recovered interview count or a market estimate. Scope acceptance and authentic evidence are eligibility gates that override all scores.

| Candidate | R | I | C | E hours | Score |
|---|---:|---:|---:|---:|---:|
| AlunUÉ refill discovery, narrow research scope | 30 | 2 | .50 | 3 | 10.00 |
| AlunUÉ essential-services finder | 30 | 1 | .25 | 2 | 3.75 |
| AlunUÉ deadlines/notification repair | 30 | 2 | .25 | 4 | 3.75 |
| Refill + groceries + scenic journey system | 30 | 2 | .50 | 9 | 3.33 |
| Opt-in local shop refill network | 30 | 1 | .25 | 7 | 1.07 |
| Native APK first, multi-service platform | 30 | 2 | .25 | 20 | .75 |

Water ranks first because the author has recent exploratory conversations to reconstruct. Other ideas have no comparable evidence supplied in this task. This is conditional and intentionally confidence-discounted. If refill preparation doubles to six hours, its score becomes 5; if confidence also halves to .25 it becomes 2.5, below the simple service/deadline alternatives. If a group already has a different topic, finish its agreed report instead of changing direction tonight. No algorithm chooses the topic objectively.

## Three trajectories

1. **Fastest acceptable attempt tonight:** confirm group/scope and live Moodle cutoff, reconstruct only supportable recollections, obtain short real follow-ups if available, complete a concise report and save the submission receipt. Full research compliance is not currently established.
2. **Focused semester project:** validated research → paper tasks → medium-fidelity prototype/heuristic review → high-fidelity prototype → at least five real UÉ user tests and SUS as required by the retained brief.
3. **Operational service later:** verify specific water points and operational ownership → recruit willing shops → maintain freshness/report moderation → add pedestrian routing and independently audited access information → assess Android distribution.

## Pages and flows

- **Discover:** demo/live mode, search/filter, candidate list, source/trust details; no forced account/location.
- **Place detail:** source, date, potability, cost, access, working state, partner consent, restrictions and correction action. Current prototype uses inline detail panels; verified data is a future requirement.
- **My journey:** start choice, explicit stop order, heuristic ordering option, Maps parts, individual legs, share/copy/text fallback.
- **Refill community:** opt-in model and local-only suggestion draft. There is no live partner registration.
- **Project/evidence:** current limits, plan, API behaviour and source links.
- **Later AlunUÉ home:** link the refill module to campus locations/essential services without rebuilding SIIUE or Moodle integrations tonight.

## Required release pipeline

Change → review evidence labels → Node tests + asset/schema checks → browser/mobile QA → review source/trust changes → deploy immutable source snapshot → smoke check hosted flow. Automated CI must check trust gates and route completeness. Deploy only when the required checks pass; browser QA is still outstanding in this environment.

Browser QA: 360/412/768/1280 px; Android Chrome and Firefox; keyboard and TalkBack; no location permission; offline after a first successful online visit; denied storage; failed/slow/429 APIs; malformed API body; >4 route stops; Maps absent; share/clipboard missing; 200% zoom; empty live inventory. Record actual results instead of ticking all boxes in advance.

## Android and APK

1. Responsive HTTPS browser build: current deliverable.
2. PWA: manifest, icon and service worker are implemented. Install prompt support depends on device/browser and private hosting. Verify on the actual Android phone.
3. Signed APK: deferred. Consider a TWA only with a stable origin and Digital Asset Links, or Capacitor if native capabilities justify it. A private owner-only host is unsuitable as the backing origin for a generally distributed TWA. APK requires a build toolchain, signing ownership and device testing. No APK was built or tested.

## Route algorithm

Only eligible stops enter a route. User-selected manual order is the default. Optional nearby-first ordering uses nearest-neighbour haversine distance. Discovery mode gives cultural stops a small distance preference. These are stop-order heuristics; they do not compute legal pedestrian paths, shade, surface, step-free access, opening-hour feasibility, or a global optimum. Google Maps computes directions after export. Never name this an optimal or safest route.

A future walking provider should return a pedestrian graph route and attributes, with caching under its terms. Filter unavailable/unconsented water first; then optimise distance and optional preferences under a detour budget, checking hours at estimated arrival. Offer alternatives and explain unknown attributes. Keep water-only and no-chat options.

## This evening: 150-minute working budget

0–10 min: live assignment/team/scope check. 10–35: reconstruct actual notes and ask focused follow-ups. 35–65: thematic analysis and three research-grounded personas if evidence permits. 65–100: empathy/journey maps, HTA and measured usability targets. 100–125: source/evidence audit and ten-page PDF review. 125–150: group review, upload, final submit if requested by Moodle, reopen and save receipt. This is a planning budget, not a guarantee; unresolved evidence cannot be repaired by polished formatting.

## Sources

- Course: https://www.moodle.uevora.pt/2627/course/view.php?id=966
- Retained phase-1 source: gemini_fase1.pdf, page 1 (pages 2–7 are AI examples)
- Retained introduction: Introdução à UC.pdf, pages 5–6
- Submission link recovered from prior context, not live-verified: https://www.moodle.uevora.pt/2627/mod/assign/view.php?id=27093
- Prior recorded cutoff: 31 Oct 00:00 Lisbon, i.e. the boundary after 30 Oct. Target earlier; current Moodle time must be checked.
- RICE: https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/
- Existing refill concept: https://www.refill.org.uk/
