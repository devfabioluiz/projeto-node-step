const userModel = require("../models/userModel");
const { hashPassword, verifyPassword } = require("./passwordService");
const { createToken } = require("./tokenService");
const { serializeUserProfile } = require("./userSerializer");

async function register({ nome, email, password, cargo }) {
  const normalizedEmail = email.toLowerCase();
  const existingUser = await userModel.findUserByEmail(normalizedEmail);

  if (existingUser) {
    const error = new Error("Ja existe um usuario com este email.");
    error.statusCode = 409;
    throw error;
  }

  const passwordData = hashPassword(password);
  const user = await userModel.createUser({
    nome,
    email: normalizedEmail,
    cargo: cargo || null,
    passwordHash: passwordData.hash,
    passwordSalt: passwordData.salt,
    criadoEm: new Date(),
  });

  const profile = serializeUserProfile(user);
  const token = createToken({
    sub: user._id.toString(),
    email: user.email,
  });

  return { token, user: profile };
}

async function login({ email, password }) {
  const user = await userModel.findUserByEmail(email.toLowerCase());

  if (!user || !verifyPassword(password, user.passwordSalt, user.passwordHash)) {
    const error = new Error("Email ou senha invalidos.");
    error.statusCode = 401;
    throw error;
  }

  return {
    token: createToken({
      sub: user._id.toString(),
      email: user.email,
    }),
    user: serializeUserProfile(user),
  };
}

async function getProfile(userId) {
  const user = await userModel.findUserById(userId);

  if (!user) {
    const error = new Error("Usuario autenticado nao encontrado.");
    error.statusCode = 404;
    throw error;
  }

  return serializeUserProfile(user);
}

module.exports = {
  register,
  login,
  getProfile,
};
