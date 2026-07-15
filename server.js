require("dotenv").config();

const { conectar, desconectar } = require("./src/database/connect");
const app = require("./app");

const PORT = process.env.PORT || 3000;

conectar()
  .then(() => {
    console.log("MongoDB conectado com sucesso");
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((erro) => {
    console.error("Erro ao conectar no MongoDB:", erro.message);
    process.exit(1);
  });

desconectar()
  .then(() => {
    console.log("MongoDB desconectado com sucesso");
  })
  .catch((erro) => {
    console.error("Erro ao desconectar do MongoDB:", erro.message);
  });

module.exports = app;
