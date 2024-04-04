const sql = require('mssql');
const config = {
  user: 'admin',
  password: 'admin',
  server: 'localhost',
  database: 'Barbier',
  port: 1390,
  options: {
    trustServerCertificate: true,
    encrypt: true
  }
};

module.exports = {
  sql, config
};
