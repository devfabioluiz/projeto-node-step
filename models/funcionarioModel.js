const { getCollection } = require("../api/db");
const { toObjectId } = require("../utils/objectId");

const collectionName = "funcionarios";

async function listFuncionarios() {
  const collection = await getCollection(collectionName);
  return collection.find({}).toArray();
}

async function getFuncionarioById(id) {
  const collection = await getCollection(collectionName);
  return collection.findOne({ _id: toObjectId(id) });
}

async function createFuncionario(funcionario) {
  const collection = await getCollection(collectionName);
  const result = await collection.insertOne(funcionario);
  return result.insertedId;
}

async function updateFuncionario(id, funcionario) {
  const collection = await getCollection(collectionName);
  return collection.updateOne({ _id: toObjectId(id) }, { $set: funcionario });
}

async function deleteFuncionario(id) {
  const collection = await getCollection(collectionName);
  return collection.deleteOne({ _id: toObjectId(id) });
}

module.exports = {
  listFuncionarios,
  getFuncionarioById,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario,
};
