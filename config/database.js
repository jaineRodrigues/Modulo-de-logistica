const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'pgadmin',
  database: 'ifsistemas',
});

pool.getConnection()
  .then((connection) => {
    console.log('MySQL connected...');
    connection.release();
  })
  .catch((err) => console.error(err));

module.exports = pool;
