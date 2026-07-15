const Produto = require("../models/Produto");

const listarProdutos = async (req, res) => {
  const produtos = await Produto.find();
  res.json(produtos);
};

const obterProduto = async (req, res) => {
  const { id } = req.params;
  const produto = await Produto.findById(id);
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }
  res.json(produto);
};

const criarProduto = async (req, res) => {
  const produto = await Produto.create(req.body);
  res.status(201).json(produto);
};

const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const produto = await Produto.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }
  res.json(produto);
};

const deletarProduto = async (req, res) => {
  const { id } = req.params;
  const produto = await Produto.findByIdAndDelete(id);
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }
  res.json({ mensagem: "Produto removido com sucesso" });
};

module.exports = {
  listarProdutos,
  obterProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto,
};
