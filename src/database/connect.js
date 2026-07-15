const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function conectar() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const MONGODB_URL =
      process.env.MONGODB_URL || "mongodb://localhost:27017/projeto-final";

    cached.promise = mongoose.connect(MONGODB_URL);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = conectar;
