const funcionarioModel = require("../models/funcionarioModel");
const { isValidObjectId } = require("../utils/objectId");
const { validateFuncionario } = require("../utils/validators");

async function list(req, res, next) {
  try {
    const funcionarios = await funcionarioModel.listFuncionarios();
    return res.json(funcionarios);
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

    const funcionario = await funcionarioModel.getFuncionarioById(id);

    if (!funcionario) {
      return res.status(404).json({ error: "Funcionario nao encontrado." });
    }

    return res.json(funcionario);
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const validationError = validateFuncionario(req.body);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const id = await funcionarioModel.createFuncionario(req.body);
    return res.status(201).json({ message: "Funcionario inserido com sucesso!", id });
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

    const validationError = validateFuncionario(req.body);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const result = await funcionarioModel.updateFuncionario(id, req.body);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Funcionario nao encontrado." });
    }

    return res.json({ message: "Funcionario atualizado com sucesso!" });
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

    const result = await funcionarioModel.deleteFuncionario(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Funcionario nao encontrado." });
    }

    return res.json({ message: "Funcionario deletado com sucesso." });
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
