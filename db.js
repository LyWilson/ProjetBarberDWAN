const sql = require('mssql');
const config = {
  user: 'admin',
  password: 'admin',
  server: 'localhost',
  database: 'Barbier_v3',
  options: {
    trustServerCertificate: true,
    encrypt: true
  }
};

// Fonction pour obtenir les salons de coiffure de la base de données
async function getSalonDeCoiffure() {
  try {
    await sql.connect(config);
    const resultat = await sql.query`SELECT nomSalon, adresse, numeroTelephoneSalon, horairesOuverture FROM Salon`;

    return resultat.recordset;
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    sql.close();
  }
}

// Route pour obtenir les salons de coiffure
app.get("/getSalonDeCoiffure", async (req, res) => {
  try {
    const salons = await getSalonDeCoiffure();
    res.json(salons);
  } catch (error) {
    console.error(error)
    res.status(500).send("Erreur lors de la récupération des salons de coiffure.");
  }
});
