const express = require("express");
const router = express.Router();

const {
  listarProdutos,
  obterProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto,
} = require("../controllers/produtoController");

const autenticar = require("../middlewares/autenticar");
const admin = require("../middlewares/admin");

router.get("/produtos", listarProdutos);
router.get("/produtos/:id", obterProduto);
router.post("/produtos", autenticar, admin, criarProduto);
router.put("/produtos/:id", autenticar, admin, atualizarProduto);
router.delete("/produtos/:id", autenticar, admin, deletarProduto);

module.exports = router;
