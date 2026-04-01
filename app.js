const express = require("express");
const authenticate = require("./middlewares/authMiddleware");
const errorHandler = require("./middlewares/errorHandler");

const muralAvisoRoutes = require("./routes/mural-avisos");
const aulasRoutes = require("./routes/aulas");
const funcionariosRoutes = require("./routes/funcionarios");
const produtosRoutes = require("./routes/produtos");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API rodando com MVC e autenticacao por token.",
    endpoints: {
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
      me: "GET /api/auth/me",
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/mural-avisos", authenticate, muralAvisoRoutes);
app.use("/api/aulas", authenticate, aulasRoutes);
app.use("/api/funcionarios", authenticate, funcionariosRoutes);
app.use("/api/produtos", authenticate, produtosRoutes);

app.use(errorHandler);

module.exports = app;
