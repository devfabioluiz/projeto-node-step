const { getCollection } = require("../api/db");
const { toObjectId } = require("../utils/objectId");

const collectionName = "produtos";

async function listProdutos({ page, limit }) {
  const collection = await getCollection(collectionName);
  const skip = (page - 1) * limit;
  const totalItens = await collection.countDocuments();
  const produtos = await collection.find({}).skip(skip).limit(limit).toArray();

  return {
    paginaAtual: page,
    itensPorPagina: limit,
    totalItens,
    totalPaginas: Math.ceil(totalItens / limit),
    produtos,
  };
}

async function getProdutoById(id) {
  const collection = await getCollection(collectionName);
  return collection.findOne({ _id: toObjectId(id) });
}

async function createProduto(produto) {
  const collection = await getCollection(collectionName);
  const result = await collection.insertOne(produto);
  return result.insertedId;
}

async function updateProduto(id, produto) {
  const collection = await getCollection(collectionName);
  return collection.updateOne({ _id: toObjectId(id) }, { $set: produto });
}

async function deleteProduto(id) {
  const collection = await getCollection(collectionName);
  return collection.deleteOne({ _id: toObjectId(id) });
}

module.exports = {
  listProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
};
