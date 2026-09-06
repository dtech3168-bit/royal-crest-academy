const mysql = require('mysql2/promise')
require('dotenv').config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

async function testDatabaseConnection() {
  try {
    const connection = await pool.getConnection()

    console.log('MySQL connected successfully')

    connection.release()
  } catch (error) {
    console.error('MySQL connection failed:', error.message)
  }
}

testDatabaseConnection()

module.exports = pool