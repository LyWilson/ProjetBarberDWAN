const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { getReservationsBySalonId, getSalonId, getUserId, getHeuresTravail, getCoiffeurId, updateSponsor} = require('../fonctionDb');

// Middleware to create directory if it doesn't exist
const createDir = (dir) => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { salonId } = req.params;
        const uploadDir = path.join(__dirname, `../Image/salon${salonId}/Portfolio${salonId}`);
        createDir(uploadDir);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Route to handle file upload
router.post('/upload/:salonId', upload.single('photo'), (req, res) => {
    console.log(req.params.salonId);
    res.send('File uploaded successfully!');
});

router.get('/getReservationsBySalonId', (req, res) => {
    const salonId = req.query.salonId;
    getReservationsBySalonId(salonId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

router.get('/getSalonId', (req, res) => {
    const email = req.query.email;
    getSalonId(email)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

router.get('/getHeuresTravail', (req, res) => {
    const salonId = req.query.salonId
    console.log(salonId)
    getHeuresTravail(salonId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

router.get('/getCoiffeurId', (req, res) => {
    const email = req.query.email;
    getCoiffeurId(email)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

router.get('/updateSponsor', async (req, res) => {
    const salonId = req.query.salonId;
    updateSponsor(salonId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

module.exports = router;
