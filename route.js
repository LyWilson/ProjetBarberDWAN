const express = require('express');
const { join } = require("path");
const router = express.Router();
const Authentification = require('./Function/Authentification');

// les routes dans /login/public
router.use(express.static(__dirname + "/login/Public"));
router.get("/connexion", (req, res) => {
    res.sendFile(join(__dirname + '/login/Public', 'connexion.html'));
});

router.get("/inscription", (req, res) => {
    res.sendFile(join(__dirname + '/login/Public', 'inscription.html'));
});


router.get("/update-password-page", (req, res) => {
    res.sendFile(join(__dirname + '/login/Public', 'update-password.html'));
});


// les routes dans /applicationClient
router.use(express.static(__dirname + "/applicationClient"));


router.get("/AccueilClient", (req, res) => {
    res.sendFile(join(__dirname + '/applicationClient/accueil', 'accueil.html'));
});
router.get("/accueil.js", (req, res) => {
    res.sendFile(join(__dirname + '/applicationClient/accueil', 'accueil.js'));
});


router.get("/favoris", (req, res) => {
    res.sendFile(join(__dirname + '/applicationClient/favoris', 'favoris.html'));
});
router.get("/favoris.js", (req, res) => {
    res.sendFile(join(__dirname + '/applicationClient/favoris', 'favoris.js'));
});


router.get("/profil", (req, res) => {
    res.sendFile(join(__dirname + '/applicationClient/profil', 'profil.html'));
});
router.get("/profil.js", (req, res) => {
    res.sendFile(join(__dirname + '/applicationClient/profil', 'profil.js'));
});


router.get("/prendreRendezVous", (req, res) => {
    res.sendFile(join(__dirname, '/applicationClient/rendezVous', 'prendreRendezVous.html'));
});
router.get("/prendreRendezVous.js", (req, res) => {
    res.sendFile(join(__dirname + '/applicationClient/rendezVous', 'prendreRendezVous.js'));
});


router.get("/rendezVous", (req, res) => {
    res.sendFile(join(__dirname + '/applicationClient/rendezVous', 'rendezVous.html'));
});
router.get("/rendezVous.js", (req, res) => {
    res.sendFile(join(__dirname + '/applicationClient/rendezVous', 'rendezVous.js'));
});


router.get("/salonDetails", (req, res) => {
    res.sendFile(join(__dirname + '/applicationClient/salonDetails', 'salonDetails.html'));
});
router.get("/salonDetails.js", (req, res) => {
    res.sendFile(join(__dirname + '/applicationClient/salonDetails', 'salonDetails.js'));
});


router.get("/appClient.css", (req, res) => {
    res.sendFile(join(__dirname + '/applicationClient', 'appClient.css'));
});

// les routes dans root
router.get("/commun.js", (req, res) => {
    res.sendFile(join(__dirname + '/', 'commun.js'));
});

router.get("/contact", (req, res) => {
    res.sendFile(join(__dirname + '/', 'contact.html'));
});

router.get("/contact.js", (req, res) => {
    res.sendFile(join(__dirname + '/', 'contact.js'));
})

router.get("/fonctionDb.js", (req, res) => {
    res.sendFile(join(__dirname + '/', 'fonctionDb.js'));
});

router.get("/db.js", (req, res) => {
    res.sendFile(join(__dirname + '/', 'db.js'));
});

router.get("/logo.png", (req, res) => {
    res.sendFile(join(__dirname + '/Image', 'img.png'));
});

// Route to handle requests for both main and reference images in salon-specific folders
router.get("/images/:salonFolder/:imageName", (req, res) => {
    const { salonFolder, imageName } = req.params;
    const filePath = join(__dirname, 'Image', salonFolder, imageName);
    res.sendFile(filePath);
});

router.get("/images/:salonFolder/:Portfolio/:imageName", (req, res) => {
    const { salonFolder, Portfolio, imageName } = req.params;
    const filePath = join(__dirname, 'Image', salonFolder, Portfolio, imageName);
    res.sendFile(filePath);
});



// les routes dans /home
router.get("/", (req, res) => {
    res.sendFile(join(__dirname + '/', 'home.html'));
});

router.get("/home.js", (req, res) => {
    res.sendFile(join(__dirname + '/', 'home.js'));
});


//Route fichier applicationCoiffeur
router.use(express.static(__dirname + "/applicationCoiffeur"));

router.get("/dashboard", (req, res) => {
    res.sendFile(join(__dirname + '/applicationCoiffeur/AccueilCoiffeur', 'dashboard.html'));
});

router.get("/dashboardPC.js", (req, res) => {
    res.sendFile(join(__dirname + '/applicationCoiffeur/AccueilCoiffeur', 'dashboardPC.js'));
});

router.get("/RdvPC", (req, res) => {
    res.sendFile(join(__dirname + '/applicationCoiffeur/historique', 'RdvPC.html'));
});

router.get("/RdvPC.js", (req, res) => {
    res.sendFile(join(__dirname + '/applicationCoiffeur/historique', 'RdvPC.js'));
});

router.get("/ProfilPC", (req, res) => {
    res.sendFile(join(__dirname + '/applicationCoiffeur/Profil', 'ProfilPC.html'));
});

router.get("/ProfilPC.js", (req, res) => {
    res.sendFile(join(__dirname + '/applicationCoiffeur/Profil', 'ProfilPC.js'));
});

router.get("/appCoiffeur.css", (req, res) => {
    res.sendFile(join(__dirname + '/applicationCoiffeur', 'appCoiffeur.css'));
});

module.exports = router;
