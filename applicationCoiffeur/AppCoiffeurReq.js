const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

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
        const uploadDir = path.join(__dirname, `/images/salon${salonId}/${salonId}/Portfolio${salonId}`);
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
    res.send('File uploaded successfully!');
});

module.exports = router;
