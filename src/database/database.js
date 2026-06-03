const mongoose = require("mongoose");

const conectarBanco = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB conectado");
  } catch (error) {
    console.log(error);
  }
};

module.exports = conectarBanco;
