const express = require("express");
const router = express.Router();

const {
  definirTema,
  obterTema,
  abrirSessao,
  statusSessao,
  encerrarSessao,
} = require("../controllers/sessaoController");

router.post("/tema", definirTema);
router.get("/tema", obterTema);

router.get("/sessao/iniciar", abrirSessao);
router.get("/sessao/status", statusSessao);
router.get("/sessao/encerrar", encerrarSessao);

module.exports = router;
