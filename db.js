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

// testing the connection to the database to the terminal
async function fetchDataFromDatabase() {
  try {
      await sql.connect(config);
      const result = await sql.query`SELECT * FROM Salon`;
      return result.recordset;
  } catch (err) {
      console.error('Error fetching data from database:', err);
      throw err;
  } finally {
      await sql.close();
  }
}

async function displayDataInTerminal() {
  try {
      const data = await fetchDataFromDatabase();
      console.log('Data from the database:');
      console.table(data); 
  } catch (err) {
      console.error('Error displaying data in terminal:', err);
  }
}

displayDataInTerminal();

module.exports = {
  sql, config
};
