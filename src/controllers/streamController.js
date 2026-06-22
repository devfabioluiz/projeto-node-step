const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const { Transform } = require("stream");

const logger = require("../utils/logger");

const downloadCSV = (req, res) => {
  const caminho = path.join(__dirname, "../../uploads/dados.csv");

  if (!fs.existsSync(caminho)) {
    logger.erro(`Arquivo não encontrado: ${caminho}`);
    return res.status(404).json({ erro: "Arquivo não encontrado" });
  }

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", "attachment; filename=dados.csv");

  logger.info("Iniciando download com stream");

  const streamLeitura = fs.createReadStream(caminho);

  streamLeitura.pipe(res);

  streamLeitura.on("end", () => {
    logger.info("Download concluído");
  });

  streamLeitura.on("error", (erro) => {
    logger.erro(`Erro no download: ${erro.message}`);
    res.status(500).json({ erro: "Erro ao fazer download" });
  });
};

const downloadCSVComprimido = (req, res) => {
  const caminho = path.join(__dirname, "../../uploads/dados.csv");

  if (!fs.existsSync(caminho)) {
    return res.status(404).json({ erro: "Arquivo não encontrado" });
  }

  const nomeArquivo = "dados.csv.gz";

  res.setHeader("Content-Type", "application/gzip");
  res.setHeader("Content-Disposition", `attachment; filename=${nomeArquivo}`);

  logger.info("Iniciando download comprimido com stream");

  fs.createReadStream(caminho).pipe(zlib.createGzip()).pipe(res);
};

module.exports = {
  downloadCSV,
  downloadCSVComprimido,
};
