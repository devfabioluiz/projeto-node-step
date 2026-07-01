const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PG_HOST || "localhost",
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE || "meubanco",
});

pool.on("error", (erro) => {
  console.log("Erro no pool do PostgreSQL:", erro.message);
});

module.exports = pool;
