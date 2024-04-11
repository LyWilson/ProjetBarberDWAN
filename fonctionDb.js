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
};

// 2) Fonction pour obtenir les données du salon par salonId
async function getSalonDataBySalonId(salonId) {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Salon WHERE salonId = ${salonId}`;
    return result.recordset[0];
  } catch (error) {
    throw error;
  } finally {
    await sql.close();
  }
};

// 3) Reservation data
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
};

async function getProfilData(email) {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Client WHERE email = ${email}`;
    return result.recordset[0];
  }
    catch (error) {
        throw error;
    } finally {
        await sql.close();
    }
}

// Exportation des fonctions de la base de données
module.exports = {
  getSalonData,
  getSalonDataBySalonId,
  getReservationData,
    getProfilData
};
