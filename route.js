const express = require('express');
const { join } = require("path");
const router = express.Router();

router.use(express.static(__dirname + "/Public"));
router.get("/", (req, res) => {
    res.sendFile(join(__dirname + '/Public', 'connexion.html'));
});

router.get("/inscription", (req, res) => {
    res.sendFile(join(__dirname + '/Public', 'inscription.html'));
});

router.use(express.static(__dirname + "/../pageClient"));
router.get("/AccueilClient", (req, res) => {
    res.sendFile(join(__dirname + '/../pageClient', 'pageAccueil.html'));
});

router.get("/update-password-page", (req, res) => {
    res.sendFile(join(__dirname + '/Public', 'update-password.html'));
});

module.exports = router;
