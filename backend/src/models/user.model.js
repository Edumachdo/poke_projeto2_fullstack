const { pool } = require('../config/database');

const User = {
  findByEmail: async (email) => {
    const [rows] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);
    return rows[0];
  },

  create: async (email, passwordHash) => {
    const [result] = await pool.query(
      'INSERT INTO User (email, password_hash) VALUES (?, ?)',
      [email, passwordHash]
    );
    return result;
  },
};

module.exports = User;
