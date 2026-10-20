# API reference

All endpoints use JSON under `/api/`. The frontend and API are served from one origin. Authentication uses Django HttpOnly session cookies; unsafe methods require the CSRF token. Get it from `GET /api/session/` and send `X-CSRFToken` on POST/DELETE. Login rotates the token, so use the token returned by the auth response afterwards.

| Method / path | Purpose | Authentication |
| --- | --- | --- |
| `GET health/` | Application/database reachability | Public |
| `GET session/` | Current username and CSRF token | Public |
| `POST auth/register/` | Create account; username/password | CSRF required |
| `POST auth/login/` | Sign in; username/password | CSRF required |
| `POST auth/logout/` | End session | CSRF required |
| `GET products/` | Product catalog and stock | Public |
| `GET network/` | Stops and synthetic route schedules | Public |
| `GET journeys/?from=railway&to=mannuthy&depart=480&sort=fastest` | Journey search; departure in minutes after midnight | Public |
| `GET orders/` | Latest 100 orders owned by current user | Required |
| `POST orders/` | Atomic demo checkout | Required + CSRF |
| `GET movement/?kind=recovery` | Latest 200 owned movement summaries | Required |
| `POST movement/` | Save a movement summary | Required + CSRF |
| `DELETE movement/{uuid}/` | Delete an owned summary | Required + CSRF |

Checkout example:

```json
{"request_id":"c2fb8da0-1c02-48be-949b-b264cc10992f","items":[{"id":"chair-01","quantity":2}]}
```

Reuse `request_id` when retrying the same checkout after a network interruption. Prices are taken from the database, never the client. All inventory changes occur in the same transaction. `request_id` is unique per user. A repeated request returns the previously saved order. This is not a payment endpoint.

Movement example:

```json
{"kind":"recovery","source":"simulation","exercise":"elbow-left","duration":12,"reps":3,"metrics":{"min_angle":40,"max_angle":170,"quality":100,"min_target":55,"max_target":145},"notes":"Synthetic example"}
```

Sources: `simulation`, `camera`, `video`. Kinds: `recovery`, `gait`. Accepted metrics: `min_angle`, `max_angle`, `quality`, `steps`, `cadence`, `interval_symmetry`, `speed`, `distance`, `pause_count`, `min_target`, `max_target`. Values must be finite numbers within bounds or null. Raw video and arbitrary JSON fields inside `metrics` are rejected. User ownership is assigned by the server.

These are client-derived measurements, not trusted clinical results. The API validates shape/ranges and access, but does not clinically verify measurements. Authentication is throttled to 10 requests/minute; production deployments should use a shared cache if scaling beyond one process/instance so throttling is consistent.
