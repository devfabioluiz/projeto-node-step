process.on("message", (dados) => {
  const { tipo, valor } = dados;

  switch (tipo) {
    case "fatorial":
      let fatorial = 1n;

      for (let i = 2n; i <= BigInt(valor); i++) {
        fatorial *= i;
      }

      process.send({
        tipo: "fatorial",
        entrada: valor,
        resultado: fatorial.toString(),
      });
      break;

    case "primos":
      const primos = [];
      const limite = valor;

      for (let n = 2; n <= limite; n++) {
        let ehPrimo = true;

        for (let d = 2; d * d <= n; d++) {
          if (n % d === 0) {
            ehPrimo = false;
            break;
          }
        }

        if (ehPrimo) {
          primos.push(n);
        }
      }

      process.send({
        tipo: "primos",
        entrada: valor,
        resultado: primos.length,
      });
      break;

    default:
      process.send({
        erro: "Tipo de cálculo não suportado",
      });
  }

  process.exit(0);
});
