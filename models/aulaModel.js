const { getCollection } = require("../api/db");

const collectionName = "aulas";

async function listAulas() {
  const collection = await getCollection(collectionName);
  return collection.find({}).toArray();
}

async function createAula(payload) {
  const collection = await getCollection(collectionName);
  const result = await collection.insertOne(payload);
  return result.insertedId;
}

module.exports = {
  listAulas,
  createAula,
};
