require("dotenv").config();

const cluster = require("cluster");
const os = require("os");

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} rodando`);
  console.log(`Criando ${numCPUs} workers...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} caiu (código: ${code})`);
    console.log("Reiniciando worker...");
    cluster.fork();
  });
} else {
  const app = require("./src/app");

  const conectarBanco = require("./src/database/database");

  conectarBanco();

  app.listen(process.env.PORT || 3000, () => {
    console.log(
      `Worker ${process.pid} ouvindo na porta ${process.env.PORT || 3000}`,
    );
  });
}
