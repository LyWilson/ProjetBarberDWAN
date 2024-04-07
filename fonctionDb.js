const { sql, config } = require('./db');

// Salon data
async function getSalonData(req, res) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(`
    SELECT
      salonId,
      nomSalon,
      adresse,
      numeroTelephoneSalon,
      horairesOuverture
    FROM Salon
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

// Reservation data
async function getReservationData(req, res) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(`
      SELECT
        Reservation.reservationId,
        Reservation.dateHeureReservation,
        Reservation.dureeReservation,
        Client.nom AS clientNom,
        Client.prenom AS clientPrenom,
        Coiffeur.nom AS coiffeurNom,
        Coiffeur.prenom AS coiffeurPrenom,
        CoiffurePreEtablie.nomCoiffure,
        CoiffurePreEtablie.descriptionCoiffure,
        CoiffurePreEtablie.dureeEstimee
      FROM Reservation
      INNER JOIN Client ON Reservation.clientId = Client.clientId
      INNER JOIN Coiffeur ON Reservation.coiffeurId = Coiffeur.coiffeurId
      INNER JOIN CoiffurePreEtablie ON Reservation.coiffureId = CoiffurePreEtablie.coiffureId
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  getSalonData,
  getReservationData
};
