const { getCollection } = require("../api/db");

const collectionName = "mural-avisos";

async function listMuralAvisos() {
  const collection = await getCollection(collectionName);
  return collection.find({}).toArray();
}

async function createMuralAviso(payload) {
  const collection = await getCollection(collectionName);
  const result = await collection.insertOne(payload);
  return result.insertedId;
}

module.exports = {
  listMuralAvisos,
  createMuralAviso,
};
