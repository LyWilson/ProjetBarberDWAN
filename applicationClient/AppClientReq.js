const express = require('express');
const router = express.Router();
const { getSalonDataBySalonId, getReservationData, getProfilData } = require('../fonctionDb');

// 1) Route pour obtenir les données du salon


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

// 3) Route pour obtenir les données de réservation selon l'email
router.get('/getReservationData', (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).send('Email parameter is required');
    }

    getReservationData(email)
        .then(result => {
            if (result) {
                res.json(result);
            } else {
                res.status(404).send('No reservations found for this email');
            }
        })
        .catch(error => {
            console.error('Database access error:', error);
            res.status(500).send('Internal Server Error');
        });
});


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

module.exports = router;

