const express = require("express");

const usuarioRoutes = require("./routes/usuarioRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const arquivoRoutes = require("./routes/arquivoRoutes");
const authRoutes = require("./routes/authRoutes");
const streamRoutes = require("./routes/streamRoutes");

const loggerMiddleware = require("./middlewares/loggerMiddleware");

const app = express();

app.use(loggerMiddleware);
app.use(express.json());

app.use(authRoutes);
app.use(produtoRoutes);
app.use(usuarioRoutes);
app.use(arquivoRoutes);
app.use(streamRoutes);

module.exports = app;
