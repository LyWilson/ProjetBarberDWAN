const sql = require('mssql');
const config = {
  user: 'admin',
  password: 'admin',
  server: 'LAPtop', //LAPtop, DESKTOP-LAP
  database: 'Barbier_v3',
  port: 1433,
  options: {
    trustedConnection: true,
    encrypt: false
  }
};


module.exports = {
  sql, config
};