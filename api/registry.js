// Vercel serverless function: GET/POST /api/registry
let store = {
  microFrontends: [],
  updatedAt: new Date().toISOString()
};

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(204).setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type')
      .end();
    return;
  }

  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    Object.entries(cors).forEach(([k,v]) => res.setHeader(k,v));
    res.status(200).send(JSON.stringify(store));
    return;
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!body || !body.scope || !body.url) {
        res.status(400).json({ error: 'Missing required fields: scope, url' });
        return;
      }

      // upsert by scope
      const idx = store.microFrontends.findIndex(m => m.scope === body.scope);
      if (idx >= 0) store.microFrontends[idx] = body;
      else store.microFrontends.push(body);

      store.updatedAt = new Date().toISOString();

      Object.entries(cors).forEach(([k,v]) => res.setHeader(k,v));
      res.status(200).json({ success: true });
    } catch (e) {
      Object.entries(cors).forEach(([k,v]) => res.setHeader(k,v));
      res.status(400).json({ error: 'Invalid JSON' });
    }
    return;
  }

  res.status(405).end('Method Not Allowed');
}
