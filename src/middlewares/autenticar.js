const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "segredo";

const autenticar = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não informado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.usuarioId = payload.id;
    req.usuarioEmail = payload.email;
    req.usuarioRole = payload.role;
    next();
  } catch (erro) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
};

module.exports = autenticar;
