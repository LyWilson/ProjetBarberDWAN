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
        CoiffurePreEtablie.descriptionCoiffure,
        Salon.salonId
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

async function getBabierData(req, res) {
    //const urlParams = new URLSearchParams(window.location.search);
    //const salonId = urlParams.get('salonId');
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query(`SELECT * FROM Coiffeur`);
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

}

// 7) Fonction pour obtenir les salons favoris selon le email du client
async function getSalonFavoris(email) {
    try {
        await sql.connect(config);
        const result = await sql.query`
      SELECT
          s.salonId,
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
    console.log(email, salonId);
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



async function getInfoCoiffure(CoiffureId) {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT dureeEstimee FROM CoiffurePreEtablie WHERE coiffureId = ${CoiffureId}`;
        return result.recordset[0].dureeEstimee
    } catch (error) {
        throw error;
    } finally {
        await sql.close();
    }
}

async function getReservationsByCoiffeurId(coiffeurId) {
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
        WHERE Reservation.coiffeurId = ${coiffeurId}
        ORDER BY Reservation.dateHeureReservation DESC;
    `;
        return result.recordset;
    } catch (error) {
        console.error('Error fetching reservations by salon ID:', error);
        throw error;
    } finally {
        await sql.close();
    }
}

async function getHeuresTravail(salonId) {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM Coiffeur WHERE salonId = ${salonId}`;
        return result.recordset;
    }
    catch (error) {
        throw error;
    } finally {
        await sql.close();
    }
};

async function getUserId(email) {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT clientId FROM Client WHERE email = ${email}`;
        console.log(result.recordset[0].clientId);
        return result.recordset[0].clientId;
    } catch (error) {
        throw error;
    } finally {
        await sql.close();
    }
}



async function getSalonId(email) {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT salonId FROM Coiffeur WHERE email = ${email}`;
        return result.recordset[0].salonId;
    } catch (error) {
        throw error;
    } finally {
        await sql.close();
    }

}

async function deleteReservation(id) {
    try {
        await sql.connect(config);
        await sql.query`DELETE FROM Reservation WHERE reservationId = ${id}`;
    } catch (error) {
        throw error;
    } finally {
        await sql.close();
    }

}

async function prendreRendezVous(clientId, coiffeurId, coiffureId, dateHeureReservation) {
    const dureeReservation = await getInfoCoiffure(coiffureId);
    console.log(clientId, coiffeurId, coiffureId, dateHeureReservation, dureeReservation);
    try {
        await sql.connect(config);
        await sql.query`
            INSERT INTO Reservation (clientId, coiffeurId, coiffureId, dateHeureReservation, dureeReservation)
            VALUES (${clientId}, ${coiffeurId}, ${coiffureId}, ${dateHeureReservation}, ${dureeReservation});
        `
        return { message: 'Réservation réussie.' };
    } catch (error) {
        throw error;
    } finally {
        await sql.close();
    }

}

async function modifierRendezVous(clientId, coiffeurId, coiffureId, dateHeureReservation, reservationId) {
    try {
        await sql.connect(config);
        await sql.query`
            UPDATE Reservation
            SET coiffeurId = ${coiffeurId}, coiffureId = ${coiffureId}, dateHeureReservation = ${dateHeureReservation}
            WHERE clientId = ${clientId} and reservationId = ${reservationId};
        `
        return { message: 'Réservation modifiée.' };
    } catch (error) {
        throw error;
    } finally {
        await sql.close();
    }
}

async function isSalonFavorite(email, salonId) {
    try {
        await sql.connect(config);
        const result = await sql.query`
      SELECT * FROM SalonFavoris
      WHERE clientId = (SELECT clientId FROM Client WHERE email = ${email})
      AND salonId = ${salonId};
    `;
        return result.recordset.length > 0;
    } catch (error) {
        throw error;
    } finally {
        await sql.close()
    }
}

async function modifyClientInfo(email, nom, prenom, numeroTelephone) {
    try {
        await sql.connect(config);
        await sql.query`
      UPDATE Client
      SET nom = ${nom}, prenom = ${prenom}, numeroTelephone = ${numeroTelephone}
      WHERE email = ${email};
    `;
    } catch (error) {
        throw error;
    } finally {
        await sql.close();
    }
}

async function getReservationsById(id) {
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
        CoiffurePreEtablie.descriptionCoiffure,
        Salon.salonId,
        Client.clientId
      FROM Reservation
      INNER JOIN Coiffeur ON Reservation.coiffeurId = Coiffeur.coiffeurId
      INNER JOIN Salon ON Coiffeur.salonId = Salon.salonId
      INNER JOIN CoiffurePreEtablie ON Reservation.coiffureId = CoiffurePreEtablie.coiffureId
      INNER JOIN Client ON Reservation.clientId = Client.clientId
      WHERE Reservation.reservationId = ${id}
      ORDER BY Reservation.dateHeureReservation DESC;`;
        return result.recordset;
    }
    catch (error) {
        throw error;
    } finally {
        await sql.close();
    }

}

async function getBabierDataBySalonId(id) {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM Coiffeur WHERE salonId = ${id}`;
        return result.recordset;
    } catch (error) {
        throw error;
    } finally {
        await sql.close();
    }
}

async function getCoiffurePreEtablieDataBySalonId(id) {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM CoiffurePreEtablie WHERE salonId = ${id}`;
        return result.recordset;
    } catch (error) {
        throw error;
    } finally {
        await sql.close();
    }
}

async function getCoiffeurId(email) {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT coiffeurId FROM Coiffeur WHERE email = ${email}`;
        return result.recordset[0].coiffeurId;
    } catch (error) {
        throw error;
    } finally {
        await sql.close();
    }
}

async function updateSponsor(salonId) {
    try {
        await sql.connect(config);
        await sql.query`delete from Sponsor`;
        await sql.query`insert into Sponsor (salonId) values (${salonId})`;
    } catch (error) {
        throw error;
    } finally {
        await sql.close();
    }
}

async function getSponsorId() {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT salonId FROM Sponsor`;
        return result.recordset[0].salonId;
    } catch (error) {
        throw error;
    } finally {
        await sql.close();
    }
}

async function ajouterAvis(coiffeurId, clientId, note, commentaire) {

    try {
        await sql.connect(config);
        await sql.query`
      INSERT INTO AvisCoiffeur ( coiffeurId, clientId, evaluation, message)
      VALUES (${coiffeurId}, ${clientId}, ${note}, ${commentaire});
    `;
    } catch (error) {
        throw error;
    } finally {
        await sql.close();
    }
}

async function ajouterAvisClient(coiffeurId, clientId, note, commentaire) {
    try {
        await sql.connect(config);
        await sql.query`
        INSERT INTO AvisClient ( coiffeurId, clientId, evaluation, message)
        VALUES (${coiffeurId}, ${clientId}, ${note}, ${commentaire})
        `;
    } catch (err) {
        throw err;
    } finally {
        await sql.close();
    }

}

async function getAvisClientsById(coiffeurId) {
    try {
        await sql.connect(config);
        const result = await sql.query`
            SELECT AvisCoiffeur.*, Client.nom AS nom_client, Client.prenom AS prenom_client 
            FROM AvisCoiffeur 
            INNER JOIN Client ON AvisCoiffeur.clientId = Client.clientId
            WHERE AvisCoiffeur.coiffeurId = ${coiffeurId}`;
        return result.recordset;
    } catch (error) {
        throw error;
    } finally {
        await sql.close();
    }
}

async function deleteClientAccount(clientId) {
    try {
        await sql.connect(config);
        await sql.query`DELETE FROM Client WHERE clientId = ${clientId}`;
    } catch (error) {
        throw error;
    } finally {
        await sql.close();
    }
}


async function getAverageRating(email) {
    try {
        await sql.connect(config);
        const result = await sql.query`
            SELECT AVG(AvisClient.evaluation) AS average_rating
            FROM AvisClient
            INNER JOIN Client ON AvisClient.clientId = Client.clientId
            WHERE Client.email = ${email}
        `;
        return result.recordset[0].average_rating;
    } catch (error) {
        throw error;
    } finally {
        await sql.close();
    }
};

//Ajout d'un avis par le coiffeur
async function ajouterAvisCoiffeur(coiffeurId, clientId, note, commentaire) {
    try {
        await sql.connect(config);
        await sql.query`
        INSERT INTO AvisClient (clientId, coiffeurId, evaluation, message)
        VALUES (${clientId}, ${coiffeurId}, ${note}, ${commentaire})
        `;
    } catch (err) {
        throw err;
    } finally {
        await sql.close();
    }
}

async function getReservationDataClient(email) {
    try {
        await sql.connect(config);
        const result = await sql.query`
        SELECT
            Reservation.reservationId,
            Reservation.dateHeureReservation,
            Reservation.dureeReservation,
            Client.nom as Nom_du_client,
            Client.prenom as Prenom_du_client,
        FROM Reservation
        INNER JOIN Client ON Reservation.clientId = Client.clientId
        WHERE Client.email = ${email}
        ORDER BY Reservation.dateHeureReservation DESC;`;
            return result.recordset;
    } catch (err) {
        throw err;
    } finally {
        await sql.close();
    }
}

async function getClientDataByClientId(id) {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM Client WHERE clientId = ${id}`;
        return result.recordset;
    } catch (err) {
        throw err;
    } finally {
        await sql.close();
    }
}

async function updateSalonProfile(salonId, adresse, numeroTelephone, description) {
    try {
        await sql.connect(config);
        await sql.query`
        UPDATE Salon
        SET adresse = ${adresse}, numeroTelephoneSalon = ${numeroTelephone}, description = ${description}
        WHERE salonid = ${salonId};
        `;
    } catch (error) {
        throw error;
    } finally {
        await sql.close();
    }
}

async function getClientDataByClientId(id) {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM Client WHERE clientId = ${id}`;
        return result.recordset;
    } catch (err) {
        throw err;
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
    prendreRendezVous,
    getBabierData,
    getReservationsByCoiffeurId,
    getHeuresTravail,
    getUserId,
    deleteReservation,
    modifierRendezVous,
    isSalonFavorite,
    getSalonId,
    modifyClientInfo,
    getReservationsById,
    getBabierDataBySalonId,
    getCoiffurePreEtablieDataBySalonId,
    ajouterAvis,
    getAvisClientsById,
    getCoiffeurId,
    updateSponsor,
    getSponsorId,
    deleteClientAccount,
    getAverageRating,
    ajouterAvisClient,
    getClientDataByClientId,
    updateSalonProfile,

};
