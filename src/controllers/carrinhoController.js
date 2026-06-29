const adicionarAoCarrinho = (req, res) => {
  if (!req.session.carrinho) {
    req.session.carrinho = [];
  }

  req.session.carrinho.push(req.body);

  res.json({
    mensagem: "Item adicionado",
    carrinho: req.session.carrinho,
  });
};

const verCarrinho = (req, res) => {
  res.json({
    carrinho: req.session.carrinho || [],
  });
};

const limparCarrinho = (req, res) => {
  req.session.carrinho = [];

  res.json({
    mensagem: "Carrinho limpo",
  });
};

module.exports = {
  adicionarAoCarrinho,
  verCarrinho,
  limparCarrinho,
};
