const logger = require("../utils/logger");

const loggerMiddleware = (req, res, next) => {
  logger.requisicao(req.method, req.url);

  next();
};

module.exports = loggerMiddleware;
            