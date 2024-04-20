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
async function getSalonDataBySalonId(req, res) {
  const salonId = req.query.salonId;
  if (!salonId) {
    return res.status(400).send('Salon ID is required');
  }
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Salon WHERE salonId = ${salonId}`;
    if (result.recordset.length === 0) {
      return res.status(404).send('Salon not found');
    }
    res.json(result.recordset[0]);
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
      INNER JOIN Salon ON Coiffeur.salonId = Salon.salonId
      INNER JOIN CoiffurePreEtablie ON Reservation.coiffureId = CoiffurePreEtablie.coiffureId
      INNER JOIN Client ON Reservation.clientId = Client.clientId
      WHERE Client.email = ${email}
      ORDER BY Reservation.dateHeureReservation DESC;`;
    return result.recordset;
  }
  catch (error) {
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

// 5) Fonction pour vérifier si le client existe
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

// 6) Fonction pour obtenir les données de coiffure prédéfinie
async function getCoiffurePreEtablieData(req, res) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(`SELECT * FROM CoiffurePreEtablie`);
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

// 7) Fonction pour obtenir les salons favoris selon le email du client
async function getSalonFavoris(email) {
  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT
          s.nomSalon,
          s.adresse,
          s.horairesOuverture
        FROM SalonFavoris sf
        INNER JOIN Salon s ON sf.salonId = s.salonId
        INNER JOIN Client c ON sf.clientId = c.clientId
        WHERE c.email = ${email};
    `;
    return result.recordset;
  } catch (error) {
    console.error('Error fetching salon favorites:', error);
    throw error;
  } finally {
    await sql.close();
  }
}

// Function to add salon to favorites
async function addSalonToFavorites(email, salonId) {
  try {
    await sql.connect(config);
    const clientIdResult = await sql.query`
      SELECT clientId FROM Client WHERE email = ${email};
    `;
    const clientId = clientIdResult.recordset[0].clientId;
    await sql.query`
      INSERT INTO SalonFavoris (clientId, salonId)
      VALUES (${clientId}, ${salonId});
    `;
  } catch (error) {
    throw error;
  } finally {
    await sql.close();
  }
}

// Function to remove salon from favorites
async function removeSalonFromFavorites(email, salonId) {
  try {
    await sql.connect(config);
    const clientIdResult = await sql.query`
      SELECT clientId FROM Client WHERE email = ${email};
    `;
    const clientId = clientIdResult.recordset[0].clientId;
    await sql.query`
      DELETE FROM SalonFavoris
      WHERE clientId = ${clientId} AND salonId = ${salonId};
    `;
  } catch (error) {
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
  getProfilData,
  verifieClient,
  getCoiffurePreEtablieData,
  getSalonFavoris,
  addSalonToFavorites,
  removeSalonFromFavorites,
};
