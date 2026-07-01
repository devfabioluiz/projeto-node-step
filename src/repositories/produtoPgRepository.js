const pool = require("../database/pg");

const listarTodos = async () => {
  const resultado = await pool.query(`
    SELECT
      p.id, p.nome, p.preco, p.estoque,
      c.nome AS categoria_nome, p.categoria_id,
      p.criado_em, p.atualizado_em
    FROM produtos_pg p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    ORDER BY p.nome
  `);

  return resultado.rows;
};

const buscarPorId = async (id) => {
  const resultado = await pool.query(
    "SELECT * FROM produtos_pg WHERE id = $1",
    [id],
  );

  return resultado.rows[0] || null;
};

const criar = async (dados) => {
  const { nome, preco, estoque, categoria_id } = dados;

  const resultado = await pool.query(
    `INSERT INTO produtos_pg (nome, preco, estoque, categoria_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nome, preco, estoque, categoria_id],
  );

  return resultado.rows[0];
};

const atualizar = async (id, dados) => {
  const { nome, preco, estoque, categoria_id } = dados;

  const resultado = await pool.query(
    `UPDATE produtos_pg
     SET nome = $1, preco = $2, estoque = $3,
         categoria_id = $4, atualizado_em = NOW()
     WHERE id = $5
     RETURNING *`,
    [nome, preco, estoque, categoria_id, id],
  );

  return resultado.rows[0] || null;
};

const deletar = async (id) => {
  const resultado = await pool.query(
    "DELETE FROM produtos_pg WHERE id = $1 RETURNING *",
    [id],
  );

  return resultado.rows[0] || null;
};

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};
