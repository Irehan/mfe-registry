# Micro-Frontend Registry — **Local (Express) + Vercel Serverless** in one repo

This repository provides **both**:

1. A **local Express** registry at **`http://localhost:4000/registry`**, and
2. A **Vercel serverless** registry at **`/api/registry`** (e.g., `https://arh-mfe-registry.vercel.app/api/registry`).

**run locally** or **hit a deployed endpoint** with the **same API contract**.

---

## 🔗 Live & Reference Links

- GitHub repo: `https://github.com/Irehan/mfe-registry`
- Remote entry (example MFE): `https://arh-mfe-booking.vercel.app/remoteEntry.js`
- Vercel serverless endpoint: `https://arh-mfe-registry.vercel.app/api/registry`
- Local dev (Express): `http://localhost:4000/registry`

> The API shape is identical in both environments. You can switch the Host app between them by changing the **registry URL** (e.g., via `VITE_REGISTRY_URL`).

---

## 📦 What’s Inside

```
mfe-registry/
├─ api/
│  └─ registry.js        # Vercel serverless function (GET/POST /api/registry)
├─ server.js             # Local Express server (GET/POST /registry)
├─ package.json          # Scripts for local and Vercel dev
└─ vercel.json           # Minimal Vercel config
```

- **Local Express**: long-running Node process on port **4000**.
- **Vercel serverless**: on-demand function responding at **`/api/registry`** when deployed.

Both return the same JSON schema:

```json
{
  "microFrontends": [
    /* array of MFE definitions */
  ],
  "updatedAt": "ISO-8601 timestamp"
}
```

---

## 🧰 Requirements

- Node.js **v18+** and npm
- (Optional) **Vercel CLI** for local testing of serverless (`npm i -g vercel`)

---

## 🚀 Quick Start (Local Express)

```bash
npm install
npm start
# Server: http://localhost:4000/registry
```

You should see:

```json
{ "microFrontends": [], "updatedAt": "..." }
```

### Seed the local registry

```bash
# Bash
curl -s -X POST http://localhost:4000/registry -H 'Content-Type: application/json' -d '{
  "name":"auth-app","displayName":"Authentication","scope":"authApp",
  "url":"https://arh-mfe-auth.vercel.app/remoteEntry.js",
  "routes":["/login","/profile"],"roles":["user","admin"],"module":"./Login"
}'

curl -s -X POST http://localhost:4000/registry -H 'Content-Type: application/json' -d '{
  "name":"booking-app","displayName":"Booking Management","scope":"bookingApp",
  "url":"https://arh-mfe-booking.vercel.app/remoteEntry.js",
  "routes":["/bookings","/book"],"roles":["user","admin"],"module":"./BookingList"
}'

curl -s -X POST http://localhost:4000/registry -H 'Content-Type: application/json' -d '{
  "name":"reporting-app","displayName":"Reporting","scope":"reportingApp",
  "url":"https://arh-mfe-reporting.vercel.app/remoteEntry.js",
  "routes":["/reports"],"roles":["admin"],"module":"./ReportDashboard"
}'
```

```powershell
# PowerShell
$ep = "http://localhost:4000/registry"

$body = @{
  name="auth-app"; displayName="Authentication"; scope="authApp";
  url="https://arh-mfe-auth.vercel.app/remoteEntry.js";
  routes=@("/login","/profile"); roles=@("user","admin"); module="./Login"
} | ConvertTo-Json -Depth 5
Invoke-RestMethod -Method Post -Uri $ep -ContentType "application/json" -Body $body

$body = @{
  name="booking-app"; displayName="Booking Management"; scope="bookingApp";
  url="https://arh-mfe-booking.vercel.app/remoteEntry.js";
  routes=@("/bookings","/book"); roles=@("user","admin"); module="./BookingList"
} | ConvertTo-Json -Depth 5
Invoke-RestMethod -Method Post -Uri $ep -ContentType "application/json" -Body $body

$body = @{
  name="reporting-app"; displayName="Reporting"; scope="reportingApp";
  url="https://arh-mfe-reporting.vercel.app/remoteEntry.js";
  routes=@("/reports"); roles=@("admin"); module="./ReportDashboard"
} | ConvertTo-Json -Depth 5
Invoke-RestMethod -Method Post -Uri $ep -ContentType "application/json" -Body $body
```

Check again:

```
GET http://localhost:4000/registry
```

---

## 🌐 Vercel Serverless (Deployed)

Once the repo is connected to Vercel, the endpoint is:

```
https://arh-mfe-registry.vercel.app/api/registry
```

### Local dev via Vercel CLI (optional)

```bash
vercel dev
# -> http://localhost:3000/api/registry
```

### Seed the Vercel registry

> Vercel functions are **stateless**. Data is stored **in-memory** per instance.  
> After redeploys/cold starts, reseed the registry or back it with a DB.

```bash
# Bash
EP=https://arh-mfe-registry.vercel.app/api/registry

curl -s -X POST "$EP" -H 'Content-Type: application/json' -d '{
  "name":"auth-app","displayName":"Authentication","scope":"authApp",
  "url":"https://arh-mfe-auth.vercel.app/remoteEntry.js",
  "routes":["/login","/profile"],"roles":["user","admin"],"module":"./Login"
}'

curl -s -X POST "$EP" -H 'Content-Type: application/json' -d '{
  "name":"booking-app","displayName":"Booking Management","scope":"bookingApp",
  "url":"https://arh-mfe-booking.vercel.app/remoteEntry.js",
  "routes":["/bookings","/book"],"roles":["user","admin"],"module":"./BookingList"
}'

curl -s -X POST "$EP" -H 'Content-Type: application/json' -d '{
  "name":"reporting-app","displayName":"Reporting","scope":"reportingApp",
  "url":"https://arh-mfe-reporting.vercel.app/remoteEntry.js",
  "routes":["/reports"],"roles":["admin"],"module":"./ReportDashboard"
}'
```

```powershell
# PowerShell
$ep = "https://arh-mfe-registry.vercel.app/api/registry"

$body = @{
  name="auth-app"; displayName="Authentication"; scope="authApp";
  url="https://arh-mfe-auth.vercel.app/remoteEntry.js";
  routes=@("/login","/profile"); roles=@("user","admin"); module="./Login"
} | ConvertTo-Json -Depth 5
Invoke-RestMethod -Method Post -Uri $ep -ContentType "application/json" -Body $body

$body = @{
  name="booking-app"; displayName="Booking Management"; scope="bookingApp";
  url="https://arh-mfe-booking.vercel.app/remoteEntry.js";
  routes=@("/bookings","/book"); roles=@("user","admin"); module="./BookingList"
} | ConvertTo-Json -Depth 5
Invoke-RestMethod -Method Post -Uri $ep -ContentType "application/json" -Body $body

$body = @{
  name="reporting-app"; displayName="Reporting"; scope="reportingApp";
  url="https://arh-mfe-reporting.vercel.app/remoteEntry.js";
  routes=@("/reports"); roles=@("admin"); module="./ReportDashboard"
} | ConvertTo-Json -Depth 5
Invoke-RestMethod -Method Post -Uri $ep -ContentType "application/json" -Body $body
```

Verify:

```
GET https://arh-mfe-registry.vercel.app/api/registry
```

---

## 🔌 API Contract (same for local & Vercel)

### GET

- **Local**: `GET /registry`
- **Vercel**: `GET /api/registry`

**Response**

```json
{
  "microFrontends": [
    {
      "name": "auth-app",
      "displayName": "Authentication",
      "scope": "authApp",
      "url": "https://.../remoteEntry.js",
      "routes": ["/login", "/profile"],
      "roles": ["user", "admin"],
      "module": "./Login"
    }
  ],
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

### POST (upsert by `scope`)

- **Local**: `POST /registry`
- **Vercel**: `POST /api/registry`

**Body (example)**

```json
{
  "name": "booking-app",
  "displayName": "Booking Management",
  "scope": "bookingApp",
  "url": "https://arh-mfe-booking.vercel.app/remoteEntry.js",
  "routes": ["/bookings", "/book"],
  "roles": ["user", "admin"],
  "module": "./BookingList"
}
```

**Notes**

- Required fields: `scope`, `url` (and typically `name`).
- If an item with the same `scope` exists, it is replaced (upsert).

---

## ⚙️ Scripts (package.json)

Typical scripts for this repo:

```json
{
  "scripts": {
    "start": "node server.js", // local Express at http://localhost:4000/registry
    "dev:vercel": "vercel dev" // local serverless at http://localhost:3000/api/registry
  }
}
```

> Ensure `"type": "module"` in `package.json` (so `server.js` can use `import` syntax) or convert `server.js` to CommonJS `require(...)` if preferred.

---

## 🧠 Persistence & CORS

- **Local Express**: in-memory during the process lifetime; resets when you restart `npm start`.
- **Vercel serverless**: **stateless** across instances/redeploys. Reseed after deploys or use a persistent store (e.g., Vercel KV, Supabase, MongoDB).
- CORS is allowed for `*` in both implementations for simplicity in demos. Lock down origins for production.

---

## ✅ Checklist

- Local: `npm start` → **GET** `http://localhost:4000/registry` returns JSON
- Local: **POST** writes entries; re-GET shows them
- Vercel: **GET** `https://arh-mfe-registry.vercel.app/api/registry` returns JSON
- Vercel: **POST** upserts by `scope`; re-GET shows entries
- Contract matches across environments (Host can switch via URL only)
- Clear seeding instructions provided

---
