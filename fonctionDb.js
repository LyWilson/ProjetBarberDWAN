const { get } = require('./applicationClient/AppClientReq');
const { sql, config } = require('./db');

// 1) Fonction pour obtenir les données du salon
async function getSalonData(req, res) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(`SELECT * FROM Salon`);
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

// 2) Fonction pour obtenir les données du salon par salonId
async function getSalonDetails(req, res) {
  const salonId = req.query.salonId;  // Get the salonId from query parameters
  if (!salonId) {
    return res.status(400).send('Salon ID is required');
  }
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Salon WHERE salonId = ${salonId}`;
    if (result.recordset.length === 0) {
      return res.status(404).send('Salon not found');
    }
    res.json(result.recordset[0]);  // Send the first record found
  } catch (err) {
    console.error('Failed to connect or query database:', err);
    res.status(500).send('Server error');
  }
}

// 3) Fonction pour obtenir les données de réservation selon l'email
async function getReservationData(email) {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT
          Client.clientId,
          Client.email,
          Salon.salonId,
          Salon.nomSalon,
          Salon.adresse,
          Salon.numeroTelephoneSalon,
          Salon.horairesOuverture,
          Coiffeur.coiffeurId,
          Coiffeur.prenom,
          Coiffeur.nom,
          CoiffurePreEtablie.coiffureId,
          CoiffurePreEtablie.nomCoiffure,
          CoiffurePreEtablie.descriptionCoiffure,
          Reservation.reservationId,
          Reservation.dateHeureReservation,
          Reservation.dureeReservation
          FROM Client
          INNER JOIN Reservation ON Client.clientId = Reservation.clientId
          INNER JOIN Salon ON Salon.salonId = Reservation.salonId
          INNER JOIN Coiffeur ON Coiffeur.coiffeurId = Reservation.coiffeurId
          INNER JOIN CoiffurePreEtablie ON CoiffurePreEtablie.coiffureId = Reservation.coiffureId
          WHERE Client.email = ${email}`;

    return result.recordset.length > 0 ? result.recordset : null;
  } catch (error) {
    console.error('Failed to execute query:', error);
    throw error;
  } finally {
    await sql.close();
  }
};

// 4) Fonction pour obtenir les données du profil selon l'email
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
};

// Exportation des fonctions de la base de données
module.exports = {
  getSalonData,
  getSalonDetails,
  getReservationData,
  getProfilData
};
