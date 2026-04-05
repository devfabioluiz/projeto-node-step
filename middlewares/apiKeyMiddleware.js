function apiKeyMiddleware(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;

  if (!apiKey) {
    return res.status(401).json({ error: 'API key ausente. Use o header x-api-key ou query param apiKey.' });
  }

  const expectedApiKey = process.env.API_KEY;
  if (!expectedApiKey) {
    return res.status(500).json({ error: 'Configuracao de API key invalida no servidor.' });
  }

  if (apiKey !== expectedApiKey) {
    return res.status(401).json({ error: 'API key invalida.' });
  }

  next();
}

module.exports = apiKeyMiddleware;