const sql = require('mssql');
const config = {
  user: 'admin',
  password: 'admin',
  server: 'localhost',
  database: 'Barbier',
  options: {
    trustServerCertificate: true,
    encrypt: true
  }
};

// Fonction pour tester la connexion à la base de données en fetch les données de la table
async function fetchDataFromTable(tableName) {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input('tableName', sql.VarChar, tableName);
    const result = await request.query(`SELECT * FROM ${tableName}`);
    return result.recordset;
  } catch (err) {
    console.error(`Error fetching data from table ${tableName}:`, err);
    throw err;
  } finally {
    await sql.close();
  }
}

// Function to display data from all tables
async function displayAllDataInTerminal() {
  try {
    const tables = ['Salon', 'Client', 'Coiffeur', 'Reservation'];
    console.log('Data from the database:');
    for (const table of tables) {
      const data = await fetchDataFromTable(table);
      console.log(`Table: ${table}`);
      console.table(data);
    }
  } catch (err) {
    console.error('Error displaying data in terminal:', err);
  }
}

displayAllDataInTerminal();

module.exports = {
  sql, config
};
