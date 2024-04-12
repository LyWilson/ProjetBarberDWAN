const { get } = require('./applicationClient/AppClientReq');
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 94353647dc29003347185e1b4fc67b4c78272a45
  }
};

async function getProfilData(email) {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Client WHERE email = ${email}`;
    return result.recordset[0];
  }
<<<<<<< HEAD
    catch (error) {
        throw error;
    } finally {
        await sql.close();
    }
}
=======
  catch (error) {
    throw error;
  } finally {
    await sql.close();
  }
};
>>>>>>> 94353647dc29003347185e1b4fc67b4c78272a45

// Exportation des fonctions de la base de données
module.exports = {
  getSalonData,
  getSalonDataBySalonId,
  getReservationData,
    getProfilData
};
