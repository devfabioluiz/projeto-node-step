require("dotenv").config();

const app = require("./src/app");

const conectarBanco = require("./src/database/database");

conectarBanco();

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando em ", process.env.PORT);
});
