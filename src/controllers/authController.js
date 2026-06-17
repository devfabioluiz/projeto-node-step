const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/Usuario");
const logger = require("../utils/logger");
const { ErroValidacao, ErroAutenticacao } = require("../utils/erros");

const JWT_SECRET = process.env.JWT_SECRET || "segredo";

const registrar = async (req, res) => {
  try {
    const { nome, email, idade, senha } = req.body;

    if (!nome || !email || !senha) {
      throw new ErroValidacao("Nome, email e senha são obrigatórios");
    }

    const existe = await Usuario.findOne({ email });

    if (existe) {
      throw new ErroValidacao("Email já cadastrado");
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      idade,
      senha: senhaHash,
    });

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    logger.info(`Usuário registrado: ${email}`);

    res.status(201).json({
      mensagem: "Usuário registrado",
      token,
    });
  } catch (erro) {
    logger.erro(`Falha no registro: ${erro.message}`);

    if (erro instanceof ErroValidacao) {
      return res.status(400).json({ erro: erro.message });
    }

    res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      throw new ErroValidacao("Email e senha são obrigatórios");
    }

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      throw new ErroAutenticacao("Email ou senha inválidos");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      throw new ErroAutenticacao("Email ou senha inválidos");
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    logger.info(`Login realizado: ${email}`);

    res.json({
      mensagem: "Login realizado",
      token,
    });
  } catch (erro) {
    logger.erro(`Falha no login: ${erro.message}`);

    if (erro instanceof ErroValidacao) {
      return res.status(400).json({ erro: erro.message });
    }

    if (erro instanceof ErroAutenticacao) {
      return res.status(401).json({ erro: erro.message });
    }

    res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

module.exports = {
  registrar,
  login,
};
            