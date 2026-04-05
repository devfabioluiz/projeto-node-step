const express = require("express");
const authenticate = require("./middlewares/authMiddleware");
const apiKeyMiddleware = require("./middlewares/apiKeyMiddleware");
const errorHandler = require("./middlewares/errorHandler");

console.log('API Key Middleware loaded:', typeof apiKeyMiddleware);

const produtosRoutes = require("./routes/produtos");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-api-key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

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

app.use("/api", apiKeyMiddleware);
app.use("/api/auth", authRoutes);
app.use("/api/produtos", authenticate, produtosRoutes);

app.use(errorHandler);

module.exports = app;
