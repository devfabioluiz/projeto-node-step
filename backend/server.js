const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const mensagens = [
  {
    id: 1,
    titulo: "Bem-vindo!",
    texto: "Esta é a primeira mensagem do servidor.",
  },
  {
    id: 2,
    titulo: "Integração",
    texto: "Front-end e Back-end conectados com sucesso!",
  },
  {
    id: 3,
    titulo: "React + Node",
    texto: "Trabalhando juntos com dados em JSON.",
  },
  {
    id: 4,
    titulo: "Teste",
    texto: "Teste",
  },
];

app.get("/api/mensagens", (req, res) => {
  res.json(mensagens);
});

app.listen(3001, () => {
  console.log("Backend rodando em http://localhost:3001");
});
