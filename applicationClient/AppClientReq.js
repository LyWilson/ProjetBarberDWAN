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
