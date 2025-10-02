import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'micodat',
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
  console.log("Connected to the database");
  return connection;
};

export { query, connect };