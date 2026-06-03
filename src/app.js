const express = require("express");

const usuarioRoutes = require("./routes/usuarioRoutes");
const produtoRoutes = require("./routes/produtoRoutes");

const app = express();

app.use(express.json());

app.use(produtoRoutes);
app.use(usuarioRoutes);

module.exports = app;
