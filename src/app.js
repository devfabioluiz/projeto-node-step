const express = require("express");

const usuarioRoutes = require("./routes/usuarioRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const arquivoRoutes = require("./routes/arquivoRoutes");
const app = express();
app.use(express.json());
app.use(produtoRoutes);
app.use(usuarioRoutes);
app.use(arquivoRoutes);
module.exports = app;
