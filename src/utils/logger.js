const EventEmitter = require("events");
const fs = require("fs");

class Logger extends EventEmitter {
  constructor() {
    super();
    this.arquivoLog = "logs/app.log";
  }

  info(mensagem) {
    const log = `[${new Date().toISOString()}] INFO: ${mensagem}`;
    this.emit("log", log);
    this.salvar(log);
  }

  erro(mensagem) {
    const log = `[${new Date().toISOString()}] ERRO: ${mensagem}`;
    this.emit("erro", log);
    this.salvar(log);
  }

  requisicao(metodo, rota) {
    const log = `[${new Date().toISOString()}] ${metodo} ${rota}`;
    this.emit("requisicao", log);
    this.salvar(log);
  }

  salvar(log) {
    const linha = log + "\n";

    fs.appendFile(this.arquivoLog, linha, (erro) => {
      if (erro) {
        console.log("Erro ao salvar log:", erro.message);
      }
    });
  }
}

const logger = new Logger();

logger.on("log", (mensagem) => {
  console.log("📝", mensagem);
});

logger.on("erro", (mensagem) => {
  console.log("❌", mensagem);
});

logger.on("requisicao", (mensagem) => {
  console.log("🌐", mensagem);
});

module.exports = logger;
            