const { Pool } = require('pg');
const { Client } = require('pg');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST, // ex: "sua-hospedagem-na-nuvem.com"
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // ex: 5432 ou outra porta fornecida pela nuvem
  ssl: {
    rejectUnauthorized: false // Pode ser necessário para bancos na nuvem
  }
});

pool.connect((err) => {
  if (err) {
    console.error('Erro de conexão:', err.stack);
  } else {
    console.log('Conectado ao banco de dados PostgreSQL');
  }
});

module.exports = pool;

// Configurar o cliente PostgreSQL
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST, // ex: "sua-hospedagem-na-nuvem.com"
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // ex: 5432 ou outra porta fornecida pela nuvem
  ssl: {
    rejectUnauthorized: false // Pode ser necessário para bancos na nuvem
  }
});

// Conectar ao banco
client.connect();

// Ler o arquivo SQL
const sql = fs.readFileSync('./database/schema.sql').toString();

// Executar o arquivo SQL
client.query(sql, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Script SQL executado com sucesso');
  client.end();
});
