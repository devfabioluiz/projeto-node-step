const admin = (req, res, next) => {
  if (req.usuarioRole !== "admin") {
    return res.status(403).json({ erro: "Acesso restrito a administradores" });
  }
  next();
};

module.exports = admin;
