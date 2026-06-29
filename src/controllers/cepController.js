const logger = require("../utils/logger");

const buscarCEP = async (req, res) => {
  const { cep } = req.params;

  const cepLimpo = cep.replace(/\D/g, "");

  if (cepLimpo.length !== 8) {
    return res.status(400).json({
      erro: "CEP deve ter 8 dígitos",
    });
  }

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

    if (!resposta.ok) {
      throw new Error("Serviço de CEP indisponível");
    }

    const dados = await resposta.json();

    if (dados.erro) {
      return res.status(404).json({
        erro: "CEP não encontrado",
      });
    }

    logger.info(`CEP consultado: ${cepLimpo}`);

    res.json({
      cep: dados.cep,
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf,
    });
  } catch (erro) {
    logger.erro(`Erro ao buscar CEP: ${erro.message}`);

    res.status(500).json({
      erro: "Erro ao consultar serviço de CEP",
    });
  }
};

module.exports = {
  buscarCEP,
};
