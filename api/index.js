const app = require("../app");
const { conectar } = require("../src/database/connect");

module.exports = async (req, res) => {
  await conectar();
  return app(req, res);
};
