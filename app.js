const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const { conectar } = require("./src/database/connect");

const produtoRoutes = require("./src/routes/produtoRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

// ─── Middlewares de Segurança ─────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(compression());

// ─── Rate Limiting ────────────────────────────────────
const limitador = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { erro: "Muitas requisições. Tente novamente mais tarde." },
});
app.use("/api/", limitador);

app.use(express.json());

// ─── Conexão com MongoDB ───────────────────────────────
app.use(async (req, res, next) => {
  try {
    await conectar();
    next();
  } catch (erro) {
    console.error("Falha na conexão MongoDB:", erro.message);
    res.status(500).json({ erro: "Erro ao conectar ao banco de dados" });
  }
});

// ─── Rota Raiz ────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    mensagem: "API do Projeto Final funcionando!",
    versao: "1.0.0",
    endpoints: {
      produtos: {
        listar: "GET /produtos",
        obter: "GET /produtos/:id",
        criar: "POST /produtos",
        atualizar: "PUT /produtos/:id",
        deletar: "DELETE /produtos/:id",
      },
      autenticacao: {
        registrar: "POST /registrar",
        login: "POST /login",
        perfil: "GET /me",
      },
    },
  });
});

// ─── Rotas da API ─────────────────────────────────────
app.use(produtoRoutes);
app.use(authRoutes);

// ─── Middleware de Erro Global ─────────────────────────
app.use((erro, req, res, next) => {
  console.error("Erro interno:", erro.message);
  res.status(erro.status || 500).json({
    erro:
      process.env.NODE_ENV === "production"
        ? "Erro interno do servidor"
        : erro.message,
  });
});

module.exports = app;
