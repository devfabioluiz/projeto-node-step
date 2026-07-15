require("dotenv").config();

const conectar = require("./src/database/connect");
const Produto = require("./src/models/Produto");
const Usuario = require("./src/models/Usuario");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

async function seed() {
  await conectar();
  console.log("MongoDB conectado — populando dados...");

  await Produto.deleteMany({});
  await Usuario.deleteMany({});

  await Produto.insertMany([
    {
      nome: "Mochila Fjallraven Foldsack No. 1",
      preco: 109.95,
      descricao: "Sua mochila perfeita para o dia a dia e viagens.",
      categoria: "masculino",
      imagem: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      avaliacao: { nota: 3.9, quantidade: 120 },
    },
    {
      nome: "Camiseta Casual Premium",
      preco: 22.3,
      descricao: "Camiseta de algodão com estilo casual.",
      categoria: "masculino",
      imagem:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      avaliacao: { nota: 4.1, quantidade: 259 },
    },
    {
      nome: "Jaqueta de Inverno Masculina",
      preco: 55.99,
      descricao: "Jaqueta quente e estilosa para o inverno.",
      categoria: "masculino",
      imagem: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      avaliacao: { nota: 4.7, quantidade: 500 },
    },
    {
      nome: "Vestido Feminino Floral",
      preco: 29.95,
      descricao: "Vestido leve e confortável para o verão.",
      categoria: "feminino",
      imagem: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
      avaliacao: { nota: 3.8, quantidade: 240 },
    },
    {
      nome: "Bolsa Feminina de Couro",
      preco: 89.99,
      descricao: "Bolsa elegante em couro legítimo.",
      categoria: "feminino",
      imagem: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
      avaliacao: { nota: 4.2, quantidade: 180 },
    },
    {
      nome: "Relógio Digital Esportivo",
      preco: 49.99,
      descricao: "Relógio resistente à água com cronômetro.",
      categoria: "eletronicos",
      imagem: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      avaliacao: { nota: 4.5, quantidade: 320 },
    },
    {
      nome: "Fone de Ouvido Bluetooth",
      preco: 79.99,
      descricao: "Fone sem fio com cancelamento de ruído.",
      categoria: "eletronicos",
      imagem: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
      avaliacao: { nota: 4.3, quantidade: 410 },
    },
    {
      nome: "Anel de Prata 925",
      preco: 15.99,
      descricao: "Anel elegante em prata 925.",
      categoria: "joias",
      imagem:
        "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
      avaliacao: { nota: 3.9, quantidade: 70 },
    },
  ]);

  console.log("8 produtos inseridos!");

  const senhaHash = await bcrypt.hash("admin123", 10);

  await Usuario.create({
    nome: "Admin",
    email: "admin@email.com",
    senha: senhaHash,
    role: "admin",
  });
  await Usuario.create({
    nome: "Usuário Teste",
    email: "usuario@email.com",
    senha: senhaHash,
    role: "user",
  });

  console.log("Usuários criados!");
  console.log("Admin: admin@email.com / senha: admin123");
  console.log("User:  usuario@email.com / senha: admin123");
  console.log("Banco populado com sucesso!");

  await mongoose.disconnect();
}

seed().catch((erro) => {
  console.error("Erro ao popular banco:", erro);
  process.exit(1);
});
