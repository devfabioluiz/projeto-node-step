function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? "Erro interno do servidor." : error.message;

  return res.status(statusCode).json({ error: message });
}

module.exports = errorHandler;
