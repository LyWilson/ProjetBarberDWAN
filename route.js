const express = require('express');
const { join } = require("path");
const router = express.Router();

router.use(express.static(__dirname + "/login/Public"));
router.get("/", (req, res) => {
    res.sendFile(join(__dirname + '/login/Public', 'connexion.html'));
});

router.get("/inscription", (req, res) => {
    res.sendFile(join(__dirname + '/login/Public', 'inscription.html'));
});
router.get("/update-password-page", (req, res) => {
    res.sendFile(join(__dirname + '/login/Public', 'update-password.html'));
});

router.use(express.static(__dirname + "/applicationClient"));

router.get("/AccueilClient", (req, res) => {
    res.sendFile(join(__dirname + '/applicationClient/accueil', 'accueil.html'));
});

router.get("/accueil.js", (req, res) => {
    res.sendFile(join(__dirname + '/applicationClient/accueil', 'accueil.js'));
});

router.get("/commun.js", (req, res) => {
    res.sendFile(join(__dirname + '/', 'commun.js'));
});

router.get("/logo.png", (req, res) => {
    res.sendFile(join(__dirname + '/Image', 'img.png'));
});

module.exports = router;
