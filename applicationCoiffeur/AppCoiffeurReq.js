const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const { getReservationsByCoiffeurId, getSalonId, getUserId, getHeuresTravail, getCoiffeurId, updateSponsor, getAvisClientsById} = require('../fonctionDb');

const countImages = (directory) => {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if (err) {
                reject(err);
            } else {
                const imageFiles = files.filter(file => {
                    return ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase());
                });
                resolve(imageFiles.length);
            }
        });
    });
};

// Middleware to create directory if it doesn't exist
const createDir = (dir) => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
}

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const { salonId } = req.params;
        const uploadDir = path.join(__dirname, `../Image/salon${salonId}/Portfolio${salonId}`);
        createDir(uploadDir);

        cb(null, uploadDir);
    },
    filename: async (req, file, cb) => {
        const { salonId } = req.params;
        const uploadDir = path.join(__dirname, `../Image/salon${salonId}/Portfolio${salonId}`);
        const imageCount = await countImages(uploadDir);

        // Construire le nouveau nom de fichier
        const newFileName = `haircut${imageCount + 1}${path.extname(file.originalname)}`;

        cb(null, newFileName);
    }
});


const upload = multer({ storage: storage });

// Route to handle file upload
router.post('/upload/:salonId', upload.single('photo'), (req, res) => {
    const { salonId } = req.params;
    const fileName = req.file.filename;
    const filePath = req.file.path;
    console.log(`Salon ID: ${salonId}, File Name: ${fileName}, File Path: ${filePath}`);
    res.send('File uploaded successfully!');
});

router.get('/getReservationsByCoiffeurId', (req, res) => {
    const coiffeurId = req.query.coiffeurId;
    getReservationsByCoiffeurId(coiffeurId)
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

router.get('/getAvisClientById', async (req, res) => {
    const coiffeurId = req.query.coiffeurId;
    getAvisClientsById(coiffeurId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});



module.exports = router;
