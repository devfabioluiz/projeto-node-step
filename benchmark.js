const http = require("http");

const totalRequisicoes = 100;
let completas = 0;
const inicio = Date.now();

for (let i = 0; i < totalRequisicoes; i++) {
  http.get("http://localhost:3000/produtos", (res) => {
    completas++;

    if (completas === totalRequisicoes) {
      const tempo = Date.now() - inicio;

      console.log(`${totalRequisicoes} requisições em ${tempo}ms`);
      console.log(
        `Média: ${(tempo / totalRequisicoes).toFixed(1)}ms por requisição`,
      );
    }
  });
}
