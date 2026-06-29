const logger = require("../utils/logger");

const definirTema = (req, res) => {
  const { tema } = req.body;

  if (!tema || !["claro", "escuro"].includes(tema)) {
    return res.status(400).json({
      erro: "Tema inválido. Use 'claro' ou 'escuro'",
    });
  }

  res.cookie("temaPreferido", tema, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  logger.info(`Tema alterado para: ${tema}`);

  res.json({ tema: tema });
};

const obterTema = (req, res) => {
  const tema = req.cookies.temaPreferido || "claro";

  res.json({ tema: tema });
};

const abrirSessao = (req, res) => {
  req.session.visitas = (req.session.visitas || 0) + 1;

  res.json({
    mensagem: "Sessão iniciada",
    visitas: req.session.visitas,
    sessaoId: req.sessionID,
  });
};

const statusSessao = (req, res) => {
  if (!req.session.visitas) {
    return res.json({
      autenticado: false,
      visitas: 0,
    });
  }

  res.json({
    autenticado: true,
    visitas: req.session.visitas,
    sessaoId: req.sessionID,
  });
};

const encerrarSessao = (req, res) => {
  req.session.destroy((erro) => {
    if (erro) {
      return res.status(500).json({
        erro: "Erro ao encerrar sessão",
      });
    }

    res.clearCookie("connect.sid");

    res.json({ mensagem: "Sessão encerrada" });
  });
};

module.exports = {
  definirTema,
  obterTema,
  abrirSessao,
  statusSessao,
  encerrarSessao,
};
