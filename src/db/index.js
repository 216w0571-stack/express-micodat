import mysql from 'mysql2/promise';
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '123456789',
  database: process.env.DB_NAME || 'micodat',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const query = async (sql, params) => {
  const [rows] = await pool.execute(sql, params);
  return rows;
};

const connect = async () => {
  const connection = await pool.getConnection();
  console.log('Database connected');
  return connection;
};

export { query, connect };