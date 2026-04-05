function apiKeyMiddleware(req, res, next) {
  console.log('API Key Middleware called for:', req.path);
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;

  if (!apiKey) {
    console.log('API key missing');
    return res.status(401).json({ error: 'API key ausente. Use o header x-api-key ou query param apiKey.' });
  }

  const expectedApiKey = process.env.API_KEY;
  if (!expectedApiKey) {
    console.log('API_KEY not set in env');
    return res.status(500).json({ error: 'Configuracao de API key invalida no servidor.' });
  }

  if (apiKey !== expectedApiKey) {
    console.log('API key invalid:', apiKey, 'expected:', expectedApiKey);
    return res.status(401).json({ error: 'API key invalida.' });
  }

  console.log('API key valid');
  next();
}

module.exports = apiKeyMiddleware;