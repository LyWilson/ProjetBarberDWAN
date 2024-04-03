// Importation des modules
const sql = require('mssql');
const config = require('../../db');

// Fonction pour obtenir les salons de coiffure de la base de données
async function getSalonDeCoiffure() {
  try {
    // Connect to the database
    await sql.connect(config);

    // Obtention des salons de coiffure de la base de données
    const resultat = await sql.query(`
      SELECT nomSalon, adresse, numeroTelephoneSalon, horairesOuverture
      FROM Salon
    `);
    console.table(resultat.recordset);

    // Catch les erreurs
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    sql.close();
  }
}

getSalonDeCoiffure();

// Exportation des fonctions
module.exports = getSalonDeCoiffure;
