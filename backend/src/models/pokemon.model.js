const { pool } = require('../config/database');

const Pokemon = {
  findAll: async (search, page = 1, limit = 30) => {
    let countSql = 'SELECT COUNT(id) as total FROM Pokemon';
    const params = [];
    const countParams = [];

    if (search) {
      const searchClause = ' WHERE name LIKE ? OR id = ?';
      countSql += searchClause;
      countParams.push(`%${search}%`, search);
    }
    
    const [countRows] = await pool.query(countSql, countParams);
    const totalItems = countRows[0].total;

    let sql = 'SELECT id, name, data FROM Pokemon';
    if (search) {
      sql += ' WHERE name LIKE ? OR id = ?';
      params.push(`%${search}%`, search);
    }

    const offset = (page - 1) * limit;
    sql += ' ORDER BY id LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await pool.query(sql, params);
    const pokemons = rows.map((row) => {
      const data = typeof row.data === 'string' ? JSON.parse(row.data) : row.data;
      return {
        id: row.id,
        name: row.name,
        ...data,
      };
    });

    return { pokemons, totalItems };
  },

  create: async ({ id, name, data }) => {
    const sql = 'INSERT INTO Pokemon (id, name, data) VALUES (?, ?, ?)';
    const [result] = await pool.query(sql, [id, name, JSON.stringify(data)]);
    return { insertId: result.insertId, id: id };
  },

  update: async (id, { name, data }) => {
    const sql = 'UPDATE Pokemon SET name = ?, data = ? WHERE id = ?';
    const [result] = await pool.query(sql, [name, JSON.stringify(data), id]);
    return result;
  },

  delete: async (id) => {
    const sql = 'DELETE FROM Pokemon WHERE id = ?';
    const [result] = await pool.query(sql, [id]);
    return result;
  },
};

module.exports = Pokemon;
