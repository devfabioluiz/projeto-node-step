const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },

  preco: {
    type: Number,
    required: true,
  },

  estoque: {
    type: Number,
    required: true,
  },
});

const Produto = mongoose.model("Produto", produtoSchema);

module.exports = Produto;
