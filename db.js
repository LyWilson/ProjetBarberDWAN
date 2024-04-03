const { Router } = require('express');
const { ConnectionPool } = require('mssql');

// Create MSSQL Connection Pool
function createMSSQLPool() {
  const config = {
    user: 'admin',
    password: 'admin',
    server: 'localhost',
    database: 'Barbier_v3',
    port: 1390,
    options: {
      trustServerCertificate: true,
      encrypt: true
    }
  };

  // Create MSSQL pool
  const pool = new ConnectionPool(config);

  // Connect to the database
  pool.connect();

  return pool;
}

// Create Express Router
const mssqlRouter = Router();

// Middleware to attach MSSQL pool to each request
mssqlRouter.use((req, res, next) => {
  req.sqlPool = createMSSQLPool();
  next();
});

// Export the router
module.exports = pool;
