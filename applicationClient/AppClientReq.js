const express = require('express');
const router = express.Router();
const { getSalonData, getSalonDataBySalonId, getReservationData, getSalonPhotosBySalonId } = require('../fonctionDb');

router.get('/getSalonPhotos', (req, res) => {
    const salonId = req.query
    console.log(salonId);
    getSalonPhotosBySalonId(salonId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});


router.get('/getSalonDataBySalonId', (req, res) => {
    const salonId = req.query
    getSalonDataBySalonId(salonId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

module.exports = router;
