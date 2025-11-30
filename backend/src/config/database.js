const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Função para criar as tabelas se elas não existirem
const createTables = async () => {
  const userTableQuery = `
    CREATE TABLE IF NOT EXISTS User (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL
    );
  `;

  const pokemonTableQuery = `
    CREATE TABLE IF NOT EXISTS Pokemon (
      id INT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      data JSON NOT NULL
    );
  `;

  try {
    const connection = await pool.getConnection();

    await connection.query(userTableQuery);

    await connection.query(pokemonTableQuery);

    connection.release();
  } catch (error) {
    process.exit(1);
  }
};

// Exporta a função para ser chamada externamente e o pool de conexões
module.exports = { pool, createTables };
