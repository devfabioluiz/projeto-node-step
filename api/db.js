const { MongoClient } = require("mongodb");
require("dotenv").config();

let client;

let clientPromise;

function getMongoUri() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Defina a variavel MONGODB_URI no ambiente.");
  }

  return uri;
}

async function getClient() {
  if (!clientPromise) {
    client = new MongoClient(getMongoUri(), {});
    clientPromise = client.connect();
  }

  return clientPromise;
}

async function getDb() {
  const connectedClient = await getClient();
  return connectedClient.db(process.env.DB_NAME || "mydatabase");
}

async function getCollection(collectionName) {
  const db = await getDb();
  return db.collection(collectionName);
}

module.exports = {
  getClient,
  getDb,
  getCollection,
};
