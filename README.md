# Local Plugin Registry (Express)

## 1) Setup

```bash
npm install
npm start
# → http://localhost:4000/registry
```

## 2) Architecture Decisions

- **In‑memory** registry for dev; simple upsert by `scope`.
- Mirrors the Vercel serverless contract so Host doesn’t change code.
- CORS enabled for demo to allow cross-origin Host/MFEs.

## 3) Communication Design

- **GET /registry** → `{ microFrontends: [], updatedAt }`
- **POST /registry** → upsert by `scope`
- **Body example**:

```json
{
  "name": "booking-app",
  "displayName": "Booking Management",
  "scope": "bookingApp",
  "url": "http://localhost:3002/remoteEntry.js",
  "routes": ["/bookings", "/book"],
  "roles": ["user", "admin"],
  "module": "./BookingList"
}
```

## PowerShell (Windows)

$endpoint = "https://arh-mfe-registry.vercel.app/api/registry"

# auth-app

$body = @{
name="auth-app"; displayName="Authentication"; scope="authApp";
url="https://arh-mfe-auth.vercel.app/remoteEntry.js";
routes=@("/login","/profile"); roles=@("user","admin"); module="./Login"
} | ConvertTo-Json -Depth 5
Invoke-RestMethod -Method Post -Uri $endpoint -ContentType "application/json" -Body $body

# booking-app

$body = @{
name="booking-app"; displayName="Booking Management"; scope="bookingApp";
url="https://arh-mfe-booking.vercel.app/remoteEntry.js";
routes=@("/bookings","/book"); roles=@("user","admin"); module="./BookingList"
} | ConvertTo-Json -Depth 5
Invoke-RestMethod -Method Post -Uri $endpoint -ContentType "application/json" -Body $body

# reporting-app

$body = @{
name="reporting-app"; displayName="Reporting"; scope="reportingApp";
url="https://arh-mfe-reporting.vercel.app/remoteEntry.js";
routes=@("/reports"); roles=@("admin"); module="./ReportDashboard"
} | ConvertTo-Json -Depth 5
Invoke-RestMethod -Method Post -Uri $endpoint -ContentType "application/json" -Body $body

---
