const buscarClima = async (req, res) => {
  const { cidade } = req.params;

  const resposta = await fetch(`https://wttr.in/${cidade}?format=j1`);

  const dados = await resposta.json();

  const atual = dados.current_condition[0];

  res.json({
    cidade: cidade,
    temperatura: atual.temp_C + "°C",
    descricao: atual.weatherDesc[0].value,
    umidade: atual.humidity + "%",
    vento: atual.windSpeed + " km/h",
  });
};

module.exports = { buscarClima };
