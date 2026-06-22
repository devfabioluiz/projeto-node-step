const fs = require("fs");

const streamEscrita = fs.createWriteStream("uploads/dados.csv");
const linhas = 10000;

streamEscrita.write("id,nome,email,idade\n");

for (let i = 1; i <= linhas; i++) {
  const linha = `${i},Usuario ${i},usuario${i}@email.com,${20 + (i % 30)}\n`;
  streamEscrita.write(linha);
}

streamEscrita.end();

streamEscrita.on("finish", () => {
  const tamanho = fs.statSync("uploads/dados.csv").size;
  console.log(`Arquivo gerado! ${linhas} linhas, ${tamanho} bytes`);
});
