const app = require("../app");
const { port } = require("../config/app");

module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}
