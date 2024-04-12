const express = require('express');
const router = express.Router();
const { getSalonData, getSalonDataBySalonId, getReservationData, getSalonPhotosBySalonId, getProfilData } = require('../fonctionDb');

router.get('/getSalonPhotos', (req, res) => {
    const salonId = req.query
    getSalonPhotosBySalonId(salonId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});


<<<<<<< HEAD
router.get('/getSalonDataBySalonId', (req, res) => {
    const salonId = req.query
    getSalonDataBySalonId(salonId)
        .then((result) => {
            res.json(result);
=======

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
>>>>>>> 94353647dc29003347185e1b4fc67b4c78272a45
        })
        .catch(error => {
            console.error('Database access error:', error);
            res.status(500).send('Internal Server Error');
        });
});
<<<<<<< HEAD

=======
>>>>>>> 94353647dc29003347185e1b4fc67b4c78272a45


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
