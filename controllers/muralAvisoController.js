const muralAvisoModel = require("../models/muralAvisoModel");
const { validateMuralAviso } = require("../utils/validators");

async function list(req, res, next) {
  try {
    const avisos = await muralAvisoModel.listMuralAvisos();
    return res.json(avisos);
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const validationError = validateMuralAviso(req.body);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const id = await muralAvisoModel.createMuralAviso(req.body);
    return res.status(201).json({ message: "Aviso criado com sucesso!", id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  list,
  create,
};
