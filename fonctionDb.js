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

// 3) Fonction pour obtenir les données de réservation selon l'email (ne marche pas)
async function getReservationData(email) {
  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT
        Reservation.reservationId,
        Reservation.dateHeureReservation,
        Reservation.dureeReservation,
        Coiffeur.nom AS coiffeurNom,
        Coiffeur.prenom AS coiffeurPrenom,
        Salon.nomSalon,
        Salon.adresse,
        CoiffurePreEtablie.nomCoiffure,
        CoiffurePreEtablie.descriptionCoiffure
      FROM Reservation
      INNER JOIN Coiffeur ON Reservation.coiffeurId = Coiffeur.coiffeurId
      INNER JOIN Salon ON Reservation.salonId = Salon.salonId
      INNER JOIN CoiffurePreEtablie ON Reservation.coiffureId = CoiffurePreEtablie.coiffureId
      INNER JOIN Client ON Reservation.clientId = Client.clientId
      WHERE Client.email = ${email}
    `;
    if (result.recordset.length === 0) {
      return null; // Or you can throw an exception or return an empty array based on how you want to handle no data.
    }
    return result.recordset;
  } catch (err) {
    console.error('Failed to fetch reservation data:', err);
    throw err; // Rethrow or handle error as needed.
  } finally {
    await sql.close(); // Ensure that you close the database connection.
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

async function verifieClient(email) {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Client WHERE email = ${email}`;
    return result.recordset.length === 0;
  } catch (error) {
    throw error;
  } finally {
    await sql.close();
  }
}


// Exportation des fonctions de la base de données
module.exports = {
  getSalonData,
  getSalonDetails,
  getReservationData,
  getProfilData,
  verifieClient,
};
