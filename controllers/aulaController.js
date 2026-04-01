const aulaModel = require("../models/aulaModel");
const { validateAula } = require("../utils/validators");

async function list(req, res, next) {
  try {
    const aulas = await aulaModel.listAulas();
    return res.json(aulas);
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const validationError = validateAula(req.body);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const id = await aulaModel.createAula(req.body);
    return res.status(201).json({ message: "Dados inseridos com sucesso!", id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  list,
  create,
};
