const express = require("express");

const router = express.Router();

const {
  listarProdutos,
  criarProdutos,
} = require("../controllers/produtoController");

router.get("/produtos", listarProdutos);

router.post("/produtos", criarProdutos);

module.exports = router;
