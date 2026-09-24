let globalCloudState: any = null;

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      globalCloudState = { ...(globalCloudState || {}), ...(payload || {}) };
      return res.status(200).json({ success: true, data: globalCloudState });
    } catch (e: any) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  if (req.method === 'GET') {
    return res.status(200).json({ success: true, data: globalCloudState });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
