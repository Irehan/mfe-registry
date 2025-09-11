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
