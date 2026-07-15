const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  descricao: { type: String },
  categoria: { type: String },
  imagem: { type: String },
  avaliacao: {
    nota: { type: Number, default: 0 },
    quantidade: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("Produto", produtoSchema);
