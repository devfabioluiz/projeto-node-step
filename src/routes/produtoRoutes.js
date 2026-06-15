const express = require("express");

const router = express.Router();

const {
  listarProdutos,
  criarProduto,
} = require("../controllers/produtoController");

const autenticar = require("../middlewares/autenticar");

router.post("/produtos", autenticar, criarProduto);

router.get("/produtos", listarProdutos);

module.exports = router;
