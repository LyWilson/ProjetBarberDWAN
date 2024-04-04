const { sql, config } = require('./db');

async function getSalonData(req, res) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query("SELECT nomSalon, adresse, numeroTelephoneSalon, horairesOuverture FROM Salon");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  getSalonData
};