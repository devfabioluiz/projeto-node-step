const { getCollection } = require("../api/db");
const { toObjectId } = require("../utils/objectId");

const collectionName = "users";

async function createUser(user) {
  const collection = await getCollection(collectionName);
  const result = await collection.insertOne(user);
  return findUserById(result.insertedId.toString());
}

async function findUserByEmail(email) {
  const collection = await getCollection(collectionName);
  return collection.findOne({ email: email.toLowerCase() });
}

async function findUserById(id) {
  const collection = await getCollection(collectionName);
  return collection.findOne({ _id: toObjectId(id) });
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
