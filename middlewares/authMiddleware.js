const authService = require("../services/authService");
const { verifyToken } = require("../services/tokenService");

async function authenticate(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Envie o token no cabecalho Authorization como Bearer." });
    }

    const token = authorization.replace("Bearer ", "").trim();
    const payload = verifyToken(token);
    const user = await authService.getProfile(payload.sub);

    req.auth = {
      token,
      payload,
      user,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ error: error.message || "Token invalido." });
  }
}

module.exports = authenticate;
