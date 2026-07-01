require("dotenv").config();

const pool = require("./pg");

const criarTabelas = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categorias (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL UNIQUE,
        descricao TEXT,
        criado_em TIMESTAMP DEFAULT NOW()
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS produtos_pg (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(150) NOT NULL,
        preco DECIMAL(10, 2) NOT NULL CHECK (preco > 0),
        estoque INTEGER NOT NULL DEFAULT 0 CHECK (estoque >= 0),
        categoria_id INTEGER REFERENCES categorias(id),
        criado_em TIMESTAMP DEFAULT NOW(),
        atualizado_em TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Tabelas criadas com sucesso!");

    process.exit(0);
  } catch (erro) {
    console.log("Erro ao criar tabelas:", erro.message);
    process.exit(1);
  }
};

criarTabelas();
