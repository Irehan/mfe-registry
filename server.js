import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Example:
 * {
 *   "name": "auth-app",
 *   "displayName": "Authentication",
 *   "scope": "authApp",
 *   "url": "http://localhost:3001/remoteEntry.js",
 *   "routes": ["/login", "/profile"],
 *   "roles": ["user","admin"],
 *   "modules": ["./Login","./UserProfile"]
 * }
 */
let registry = [];

app.get('/registry', (_req, res) => {
  res.json({ microFrontends: registry, updatedAt: new Date().toISOString() });
});

app.post('/registry', (req, res) => {
  const plugin = req.body || {};
  if (!plugin.name || !plugin.scope || !plugin.url) {
    return res.status(400).json({ error: 'name, scope, url are required' });
  }
  const idx = registry.findIndex(p => p.scope === plugin.scope);
  if (idx >= 0) registry[idx] = { ...registry[idx], ...plugin };
  else registry.push(plugin);
  res.json({ ok: true });
});

const port = process.env.REGISTRY_PORT || 4000;
app.listen(port, () => {
  console.log(`🔌 Plugin registry running on http://localhost:${port}/registry`);
});
