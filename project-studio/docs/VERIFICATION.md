# Verification and remaining work

## Automated checks performed

- 7 algorithm tests: direct/transfer journey validity, minimum connection time, reverse service, unserved stops, end-of-day no-service, ranking, angle geometry, rep completion and tracking gaps, gait timing.
- 10 Django tests: server-computed prices, duplicate checkout protection, quantity/stock limits, rollback of unavailable carts, order ownership, movement ownership/deletion, metric validation, routing, anonymous-login CSRF, seed idempotence, health/unknown endpoints.
- 4 component interaction tests: catalog → cart → saved order → order history; route search → itinerary → invalid same-stop search; Recovery simulation → save; GaitGuardian simulation → save.
- Vite browser-demo and server-mode production builds.
- Django system checks, production deployment checks, and SQLite migrations/seed.
- Production-mode Django smoke checks returned HTTP 200 for the frontend, nested frontend route, health endpoint, session endpoint, and compiled JavaScript asset.

All 21 automated tests passed. Component tests use JSDOM and mocks for map/canvas surfaces. They verify UI actions and persistence, not actual rendering quality, camera hardware, tile loading, or model accuracy.

## Not verified here

- Browser visual inspection at desktop/mobile sizes. The supported browser QA capability was unavailable; responsive layouts are implemented but need a real-device review.
- Physical camera input, decoded real video, model download/WASM execution, and pose accuracy. The integration is implemented; only synthetic measurement inputs were exercised.
- A running PostgreSQL deployment, Docker build, live inventory concurrency on PostgreSQL, and production hosting.
- Real transport datasets, real payment/fulfillment, clinician validation, clinical exercise-quality assessment, balance/fall prediction, or automatic caregiver messaging. These are not implemented production capabilities.

## Acceptance tasks before calling a project production-ready

1. Review each interface on your laptop and phone. Test offline/permission-denied/unsupported-video states.
2. For Routewise, obtain a licensed and verified operator dataset, handle service calendars/overnight routes, and validate sampled journeys against actual timetables.
3. For Timberly, use a payment provider's test environment, verify signed webhooks, add fulfillment/refunds/taxes, and test transactional stock with concurrent clients on PostgreSQL.
4. For motion tools, collect consented representative recordings, compare with labelled measurements, quantify error and missed detections, and obtain appropriate clinical review before making healthcare claims. Keep videos local unless a separate consent/storage design is introduced.
5. For hosting, supply a durable PostgreSQL database and environment variables, then test browser → API → database → reload. Add backups, password reset, monitoring, a shared rate-limit cache, and account-data deletion before real multi-user use.

No user GitHub project was declared completed based only on these prototypes. No protected LabTwin repository was modified.
