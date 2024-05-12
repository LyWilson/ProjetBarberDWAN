const express = require('express');
const router = express.Router();
const { prendreRendezVous, getReservationData, getProfilData, getSalonFavoris, addSalonToFavorites, removeSalonFromFavorites,
    getUserId, deleteReservation, modifierRendezVous, isSalonFavorite,modifyClientInfo, getReservationsById, getBabierDataBySalonId, getCoiffurePreEtablieDataBySalonId, ajouterAvis,
    getSponsorId, deleteClientAccount
} = require('../fonctionDb');

// 1) Route pour obtenir les données du salon

/* NOTE: CETTE ROUTE NE MARCHE PAS DONC JE LAI COMMENTÉ ET MIS SUR APP.JS
// 2) Route pour obtenir les données du salon par salonId
router.get('/getSalonDataBySalonId', (req, res) => {
    const salonId = req.query
    getSalonDataBySalonId(salonId)
        .then((result) => {
            res.json(result);
        })
        .catch(error => {
            console.error('Database access error:', error);
            res.status(500).send('Internal Server Error');
        });
});
*/
router.post('modifierRendezVous', (req, res) => {
    const { clientId, coiffeurId, coiffureId, date, heure, reservationId } = req.body
    const dateHeureReservation = `${date} ${heure}:00.000`
    modifierRendezVous(clientId, coiffeurId, coiffureId, dateHeureReservation, reservationId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
})
// 3) Route pour obtenir les données de réservation selon l'email
router.get('/getReservationData', (req, res) => {
    const info = req.query
    getReservationData(info.email)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
})

// 4) Route pour obtenir le profil de l'utilisateur
router.get('/getProfilData', (req, res) => {
    const info = req.query
    console.log(info.email)
    getProfilData(info.email)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
})

// 5) Route pour obtenir les données de salon favoris
router.get('/getSalonFavoris', (req, res) => {
    const info = req.query
    getSalonFavoris(info.email)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
})

router.post('/addSalonToFavorites', async (req, res) => {
    try {
      const salonId = req.query.salonId
      const email = req.query.email;
      await addSalonToFavorites(email, salonId);
      res.sendStatus(200); // Success response
    } catch (error) {
      console.error('Error adding salon to favorites:', error);
      res.status(500).send('Internal Server Error'); // Error response
    }
  });

  // Route to remove salon from favorites
router.delete('/removeSalonFromFavorites', async (req, res) => {
try {
  const salonId= req.body.salonId;
  const email = req.body.email; // Assuming you have middleware to authenticate users and attach user data to req.user
  await removeSalonFromFavorites(email, salonId);
  res.sendStatus(200); // Success response
} catch (error) {
  console.error('Error removing salon from favorites:', error);
  res.status(500).send('Internal Server Error'); // Error response
}
});

router.post('/prendreRendezVous', (req, res) => {
    const { clientId, coiffeurId, coiffureId, date, heure } = req.body
    const dateHeureReservation = `${date} ${heure}:00.000`
    prendreRendezVous(clientId, coiffeurId, coiffureId, dateHeureReservation)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

router.get('/getClientID', (req, res) => {
    const email = req.query.email
    console.log(email)
    getUserId(email)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

router.get('/deleteReservation', (req, res) => {
    const reservationId = req.query.reservationId
    deleteReservation(reservationId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

router.post('/modifierRendezVous', (req, res) => {
    const { clientId, coiffeurId, coiffureId, date, heure, reservationId } = req.body
    const dateHeureReservation = `${date} ${heure}:00.000`
    modifierRendezVous(clientId, coiffeurId, coiffureId, dateHeureReservation, reservationId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
})

router.get('/isSalonFavorite', (req, res) => {
    const { email, salonId } = req.query
    isSalonFavorite(email, salonId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
})

router.post('/modifyClientInfo', (req, res) => {
    const email = req.body.email
    const nom = req.body.nom
    const prenom = req.body.prenom
    const numeroTelephone = req.body.numeroTelephone
    console.log(email, nom, prenom, numeroTelephone)
    modifyClientInfo(email, nom, prenom, numeroTelephone)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

router.get('/getReservationData/:id', (req, res) => {
    const id = req.params.id
    getReservationsById(id)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

router.get('/getBabierDataBySalonId/:id', (req, res) => {
    const salonId = req.params.id
    getBabierDataBySalonId(salonId)
        .then((result) => {
            res.json(result);
        })
        .catch(error => {
            console.error('Database access error:', error);
            res.status(500).send('Internal Server Error');
        });
})

router.get('/getCoiffurePreEtablieDataBySalonId/:salonId', (req, res) => {
    const salonId = req.params.salonId
    getCoiffurePreEtablieDataBySalonId(salonId)
        .then((result) => {
            res.json(result);
        })
        .catch(error => {
            console.error('Database access error:', error);
            res.status(500).send('Internal Server Error');
        });
})

router.post('/ajouterAvis', async (req, res) => {
    try {
        const { coiffeurId, clientId, note, avis } = req.body
        await ajouterAvis( coiffeurId, clientId, note, avis);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error adding avis:', error);
        res.status(500).send('Internal Server Error'); // Error response
    }
})
router.get('/getSponsorId', (req, res) => {
    getSponsorId()
        .then((result) => {
            res.json(result);
        })
        .catch(error => {
            console.error('Database access error:', error);
            res.status(500).send('Internal Server Error');
        });
})

router.delete('/deleteClientAccount', async (req, res) => {
    try {
        const clientId = req.query.clientId;
        await deleteClientAccount(clientId);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error deleting client account:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
