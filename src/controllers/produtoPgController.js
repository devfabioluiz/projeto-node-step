const repository = require("../repositories/produtoPgRepository");
const logger = require("../utils/logger");

const listar = async (req, res) => {
  try {
    const produtos = await repository.listarTodos();
    res.json(produtos);
  } catch (erro) {
    logger.erro(`Erro ao listar produtos PG: ${erro.message}`);
    res.status(500).json({ erro: "Erro ao listar produtos" });
  }
};

const criar = async (req, res) => {
  try {
    const { nome, preco, estoque, categoria_id } = req.body;

    if (!nome || !preco) {
      return res.status(400).json({
        erro: "Nome e preço são obrigatórios",
      });
    }

    const produto = await repository.criar({
      nome,
      preco: Number(preco),
      estoque: Number(estoque) || 0,
      categoria_id: categoria_id || null,
    });

    logger.info(`Produto PG criado: ${nome}`);

    res.status(201).json(produto);
  } catch (erro) {
    logger.erro(`Erro ao criar produto PG: ${erro.message}`);
    res.status(500).json({ erro: "Erro ao criar produto" });
  }
};

const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    const produto = await repository.deletar(id);

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    res.json({ mensagem: "Produto removido", produto });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao deletar produto" });
  }
};

module.exports = { listar, criar, deletar };
