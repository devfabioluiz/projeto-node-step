const { fork } = require("child_process");
const path = require("path");
const logger = require("../utils/logger");

const executarCalculo = (req, res) => {
  const { tipo, valor } = req.body;

  if (!tipo || !valor) {
    return res.status(400).json({
      erro: "Informe 'tipo' (fatorial ou primos) e 'valor'",
    });
  }

  const tiposValidos = ["fatorial", "primos"];

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      erro: `Tipo inválido. Use: ${tiposValidos.join(", ")}`,
    });
  }

  logger.info(`Iniciando cálculo ${tipo}(${valor}) em processo filho`);

  const caminhoWorker = path.join(__dirname, "../../workers/calculo.js");

  const worker = fork(caminhoWorker);

  worker.send({ tipo, valor });

  worker.on("message", (resultado) => {
    res.json(resultado);
    logger.info(`Cálculo ${tipo} concluído`);
  });

  worker.on("error", (erro) => {
    logger.erro(`Erro no worker: ${erro.message}`);
    res.status(500).json({ erro: "Erro no processamento" });
  });
};

module.exports = { executarCalculo };
