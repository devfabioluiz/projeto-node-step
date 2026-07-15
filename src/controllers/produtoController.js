const Produto = require("../models/Produto");

const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

const obterProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findById(id);
    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }
    res.json(produto);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

const criarProduto = async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }
    res.json(produto);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByIdAndDelete(id);
    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }
    res.json({ mensagem: "Produto removido com sucesso" });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

module.exports = {
  listarProdutos,
  obterProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto,
};
