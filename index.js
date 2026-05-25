const express = require('express');

const app = express();

app.use(express.json());

const produtos = [
  {
    id: 1,
    nome: 'Notebook'
  },
  {
    id: 2,
    nome: 'Mouse'
  }
];

app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.get('/produtos', (req, res) => {
  res.json(produtos);
});

app.post('/produtos', (req, res) => {

  const novoProduto = req.body;

  produtos.push(novoProduto);

  res.status(201).json({
    mensagem: 'Produto criado',
    produto: novoProduto
  });
});


app.delete('/produtos/:id', (req, res) => {

  const id = Number(req.params.id);

  const indiceProduto = produtos.findIndex(
    (produto) => produto.id === id
  );

  if (indiceProduto === -1) {

    return res.status(404).json({
      mensagem: 'Produto não encontrado'
    });
  }

  produtos.splice(indiceProduto, 1);

  res.json({
    mensagem: 'Produto removido'
  });
});

app.get('/produtos/:id', (req,res) => {
  const id = Number(req.params.id);
  const indiceProduto = produtos.findIndex(
    (produto) => produto.id === id
  );
    if (indiceProduto === -1) {

    return res.status(404).json({
      mensagem: 'Produto não encontrado'
    });
  }
   res.json(produtos[indiceProduto]);
})
            

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
            