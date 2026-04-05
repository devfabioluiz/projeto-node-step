const app = require("../app");
const { port } = require("../config/server");

console.log('API index.js loaded, app:', typeof app);

module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}
