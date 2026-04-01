const produtoModel = require("../models/produtoModel");
const { isValidObjectId } = require("../utils/objectId");
const { validateProduto } = require("../utils/validators");

async function list(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const result = await produtoModel.listProdutos({ page, limit });
    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

async function getById(req, res, next) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "ID invalido." });
    }

    const produto = await produtoModel.getProdutoById(id);

    if (!produto) {
      return res.status(404).json({ error: "Produto nao encontrado." });
    }

    return res.json(produto);
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const validationError = validateProduto(req.body);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const produto = {
      ...req.body,
      data_criacao: new Date(),
      ultima_atualizacao: new Date(),
      status: req.body.status || "ativo",
    };

    const id = await produtoModel.createProduto(produto);
    return res.status(201).json({ message: "Produto inserido com sucesso!", id });
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "ID invalido." });
    }

    const validationError = validateProduto(req.body);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const produto = {
      ...req.body,
      ultima_atualizacao: new Date(),
    };

    const result = await produtoModel.updateProduto(id, produto);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Produto nao encontrado." });
    }

    return res.json({ message: "Produto atualizado com sucesso!" });
  } catch (error) {
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "ID invalido." });
    }

    const result = await produtoModel.deleteProduto(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Produto nao encontrado." });
    }

    return res.json({ message: "Produto deletado com sucesso!" });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
