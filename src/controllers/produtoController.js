const Produto = require("../models/Produto");

// GET /produtos
const listarProdutos = async (req, res) => {
  const produtos = await Produto.find();

  res.json(produtos);
};

const criarProduto = async (req, res) => {
  const produto = await Produto.create(req.body);

  res.status(201).json(produto);
};

module.exports = {
  listarProdutos,
  criarProduto,
};
