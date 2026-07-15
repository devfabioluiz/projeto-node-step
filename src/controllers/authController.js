const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const JWT_SECRET = process.env.JWT_SECRET || "segredo";

const registrar = async (req, res) => {
  const { nome, email, senha, role } = req.body;

  const existe = await Usuario.findOne({ email });
  if (existe) {
    return res.status(400).json({ erro: "Email já cadastrado" });
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const usuario = await Usuario.create({
    nome,
    email,
    senha: senhaHash,
    role: role || "user",
  });

  const token = jwt.sign(
    { id: usuario._id, email: usuario.email, role: usuario.role },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.status(201).json({
    mensagem: "Usuário registrado com sucesso",
    token,
    usuario: {
      id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
    },
  });
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res.status(401).json({ erro: "Email ou senha inválidos" });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ erro: "Email ou senha inválidos" });
  }

  const token = jwt.sign(
    { id: usuario._id, email: usuario.email, role: usuario.role },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.json({
    mensagem: "Login realizado com sucesso",
    token,
    usuario: {
      id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
    },
  });
};

const perfil = async (req, res) => {
  const usuario = await Usuario.findById(req.usuarioId).select("-senha");
  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }
  res.json({
    usuario: {
      id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
    },
  });
};

module.exports = { registrar, login, perfil };
