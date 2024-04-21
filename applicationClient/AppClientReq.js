const express = require('express');
const router = express.Router();
const { prendreRendezVous, getReservationData, getProfilData, getSalonFavoris, addSalonToFavorites, removeSalonFromFavorites } = require('../fonctionDb');

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
      const { salonId } = req.body;
      const email = req.user.email; // Assuming you have middleware to authenticate users and attach user data to req.user
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
  const { salonId } = req.body;
  const email = req.user.email; // Assuming you have middleware to authenticate users and attach user data to req.user
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



module.exports = router;

