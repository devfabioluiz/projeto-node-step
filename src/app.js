const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");

const usuarioRoutes = require("./routes/usuarioRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const arquivoRoutes = require("./routes/arquivoRoutes");
const authRoutes = require("./routes/authRoutes");
const streamRoutes = require("./routes/streamRoutes");
const cepRoutes = require("./routes/cepRoutes");
const sessaoRoutes = require("./routes/sessaoRoutes");
const climaRoutes = require("./routes/climaRoutes");
const carrinhoRoutes = require("./routes/carrinhoRoutes");
const produtoPgRoutes = require("./routes/produtoPgRoutes");
const loggerMiddleware = require("./middlewares/loggerMiddleware");
const calculoRoutes = require("./routes/calculoRoutes");

const app = express();

app.use(loggerMiddleware);

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "segredo-super-seguro",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 60 * 1000,
      httpOnly: true,
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

app.use(calculoRoutes);
app.use(authRoutes);
app.use(produtoRoutes);
app.use(usuarioRoutes);
app.use(arquivoRoutes);
app.use(streamRoutes);
app.use(cepRoutes);
app.use(sessaoRoutes);
app.use(climaRoutes);
app.use(carrinhoRoutes);
app.use(produtoPgRoutes);

module.exports = app;
