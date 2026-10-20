# Francis Project Studio

Four working portfolio prototypes in a React + Django monorepo. Each has its own interface and feature module; accounts, API infrastructure, and persistence are shared.

| Project | Frontend route | Implemented |
| --- | --- | --- |
| Bus Route Information System / Routewise | `/#/bus` | Stop discovery, forward/reverse routes, timetable search, direct/one-transfer journeys, minimum connection time, fare/arrival ranking, maps, stop lists, saved stop pairs |
| Timberly | `/#/timberly` | Product catalog, categories, room filters, sorting, product details, cart, stock checks, idempotent demo checkout, order history |
| AI Recovery Assistant | `/#/recovery` | Camera/local video/12-second simulation, MediaPipe pose detection, joint angles, adjustable targets, full-cycle counter, tracking coverage, private history, CSV export |
| GaitGuardian | `/#/gait` | Camera/local video/simulation, experimental side-view step detection, cadence, temporal symmetry, optional distance-based speed, comparable-session trend review, CSV export |

**LabTwin is excluded from implementation.** It replaces the AI Study Analyzer in the portfolio plan. No LabTwin source or repository was changed.

## What is complete, and what is still a prototype?

The four main user flows are implemented and tested. This is a starting version for portfolio demonstration and further development, not a claim that all original planned production features are complete.

- Transit uses a synthetic Thrissur-area network. Route geometry is straight segments between approximate stops. Times, fares, frequencies, and services are fictional. Replace it with verified operator/GTFS data before offering travel advice; overnight/multiple-transfer routing is not implemented.
- Timberly uses a fictional catalog and demo orders. There is no real payment, shipping, tax, refund, or fulfillment integration. Product art is illustrative.
- Recovery measures estimated angles and counts cycles against configured targets. It does not assess clinically correct exercise technique, prescribe exercises, or diagnose recovery. Camera placement and occlusion affect measurements.
- GaitGuardian implements an experimental ankle-crossing detector for a side view. Temporal symmetry is not spatial gait symmetry or a balance/fall-risk score. Speed requires a user-measured distance and correctly timed walk. Automatic caregiver messages and clinically validated fall prediction are not implemented.
- The two motion tools process video locally. They only save numeric summaries, source labels, and optional notes. Simulation records are labelled and are not mixed with camera/video records in trend comparisons.

## Run on your Windows laptop — full React + Django mode

Use Python 3.12+ and Node 22. Open two terminals in this folder.

Terminal 1 (PowerShell), one command at a time:

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
.\.venv\Scripts\python.exe backend\manage.py migrate
.\.venv\Scripts\python.exe backend\manage.py seed_demo
.\.venv\Scripts\python.exe backend\manage.py runserver 127.0.0.1:8000
```

If your installed Python version differs, use `py -m venv .venv` for the first command.

Terminal 2:

```powershell
npm ci
npm run dev
```

Open **http://127.0.0.1:5173**. Vite forwards `/api/` to Django. Create an account using Sign in → Create account. No hard-coded user accounts are provided. Catalog/routes are public; orders and movement records require login. Local data is in `backend/db.sqlite3`.

Optional database administration:

```powershell
.\.venv\Scripts\python.exe backend\manage.py createsuperuser
```

Then open **http://127.0.0.1:8000/admin/** to manage catalog, stops, and routes.

## macOS / Linux

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r backend/requirements.txt
.venv/bin/python backend/manage.py migrate
.venv/bin/python backend/manage.py seed_demo
.venv/bin/python backend/manage.py runserver 127.0.0.1:8000
```

In another terminal: `npm ci`, then `npm run dev`.

## Browser demo versus server mode

- `npm run dev`: React + Django mode by default. Django must be running.
- `npm run build`: browser demo build in `dist/`. Uses localStorage for demo orders and movement summaries. No backend or account is used. Refreshing preserves browser records; clearing site data removes them. Do not enter sensitive notes in a shared browser.
- `npm run build:server`: integrated Django frontend build. Run Django to serve `dist/` and `/api/` from one origin. Do not serve this build on a static-only host without a Django API proxy.
- Hash routes avoid refresh 404s when deployed as a static site.
- Maps load OpenStreetMap tiles. Camera/video mode downloads the pinned MediaPipe WASM and Google's pose model on first use. An internet connection, HTTPS/localhost, and a supported browser are needed. Simulations need no camera or external pose model. Camera mode requests video permission only after Start; it never requests microphone access.

## PostgreSQL locally

The Django database switches to PostgreSQL when `DATABASE_URL` is set. Without it, SQLite is used for a quick start.

With Docker installed:

1. Copy `.env.example` to `.env` and replace both sample values with long, random URL-safe strings.
2. Run `docker compose up --build`.
3. Open **http://127.0.0.1:8000**. The container builds the server-mode frontend, migrates PostgreSQL, and seeds the sample catalog/network.

The supplied Compose file is a local setup (`DEBUG=true`, loopback port only). Database records persist in the `studio_postgres` volume. Re-seeding preserves product stock and all user records. Do not remove the volume if you need the records.

## Deploying the Django version

The Dockerfile can be deployed to a container host such as Render. A running PostgreSQL instance is needed for durable multi-instance storage.

Set `DEBUG=false`, a unique `SECRET_KEY`, `DATABASE_URL`, `ALLOWED_HOSTS=your-hostname`, and `CSRF_TRUSTED_ORIGINS=https://your-hostname`. Set `SEED_DEMO=true` only if you want the sample network/catalog. Use `/api/health/` as the health check. The service listens on `$PORT` or 8000. Terminate HTTPS at the trusted reverse proxy; the application honors its `X-Forwarded-Proto` header. Keep one origin for the frontend and API.

No paid hosting, database, payment processor, or message provider has been provisioned. The Docker/PostgreSQL configuration has not been exercised against a running PostgreSQL server in this environment. Review hosting costs before creating resources.

## Tests

```powershell
npm test
npm run test:ui
.\.venv\Scripts\python.exe backend\manage.py test core
```

Use `.venv/bin/python` instead of the Windows executable on Linux/macOS.

See `docs/VERIFICATION.md` for coverage and verification limits, and `docs/API.md` for the API. Source modules are under `frontend/src/projects/`; shared algorithms are under `frontend/src/lib/`; the backend is under `backend/core/`.

## Documentation used

- MediaPipe web pose guide: https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker/web_js
- Django REST framework authentication: https://www.django-rest-framework.org/api-guide/authentication/
- Leaflet quick start: https://leafletjs.com/examples/quick-start/
- OpenStreetMap tile usage policy: https://operations.osmfoundation.org/policies/tiles/

Before scaling public map usage, choose a tile provider/hosting arrangement suited to your traffic. Third-party package licenses are retained in their installed distributions. Do not redistribute the pose model under a license you have not reviewed.
