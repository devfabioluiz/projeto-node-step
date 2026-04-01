const authService = require("../services/authService");
const { validateAuthPayload, validateLoginPayload } = require("../utils/validators");

async function register(req, res, next) {
  try {
    const validationError = validateAuthPayload(req.body);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const result = await authService.register(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const validationError = validateLoginPayload(req.body);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const result = await authService.login(req.body);
    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

async function me(req, res) {
  return res.json(req.auth.user);
}

module.exports = {
  register,
  login,
  me,
};
