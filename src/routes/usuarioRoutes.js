const express = require("express");

const router = express.Router();

const {
  listarUsuarios,
  criarUsuario,
} = require("../controllers/usuarioController");

router.get("/usuarios", listarUsuarios);

router.post("/usuarios", criarUsuario);

module.exports = router;
