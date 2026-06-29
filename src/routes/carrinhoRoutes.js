const express = require("express");
const router = express.Router();

const {
  adicionarAoCarrinho,
  verCarrinho,
  limparCarrinho,
} = require("../controllers/carrinhoController");

router.post("/carrinho", adicionarAoCarrinho);
router.get("/carrinho", verCarrinho);
router.delete("/carrinho", limparCarrinho);

module.exports = router;
