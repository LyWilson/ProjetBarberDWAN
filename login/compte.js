const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { config} = require("../db");
const {sql} = require("../db");

const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: false }));

router.post("/register-client", async (req, res) => {
    const { nom, prenom, motDePasse, email, numeroTelephone, Client, Coiffeur, salonId, horairesTravail } = req.body;
    console.log({ nom, prenom, motDePasse, email, numeroTelephone, Client, Coiffeur, salonId, horairesTravail });

    // Hashage du mot de passe
    const encryptedPassword = await bcrypt.hash(motDePasse, 10);

    try {
        let pool = await sql.connect(config);
        let request = pool.request();

        if (Client) {
            // Insérer dans la table Client
            await request.query(`
                INSERT INTO Client (nom, prenom, motDePasseEncrypte, email, numeroTelephone)
                VALUES ('${nom}', '${prenom}', '${encryptedPassword}', '${email}', '${numeroTelephone}')
            `);
        } else if (Coiffeur) {
            // Insérer dans la table Coiffeur
            await request.query(`
                INSERT INTO Coiffeur (nom, prenom, motDePasseEncrypte, email, numeroTelephone, salonId, horairesTravail)
                VALUES ('${nom}', '${prenom}', '${encryptedPassword}', '${email}', '${numeroTelephone}', ${salonId}, '${horairesTravail}')
            `);
        } else {
            // Aucun bouton n'est sélectionné
            alert("Veuillez sélectionner un type d'utilisateur.");
        }

        // Générer le jeton JWT
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
        console.log({ token, message: "Inscription réussie." });
        res.redirect("/connexion");
    } catch (error) {
        console.error("Erreur SQL", error);
        res.status(500).json({ message: "Échec de l'inscription. Erreur interne du serveur." });
    }
});


router.post("/login", async (req, res) => {
    const { email, motDePasse, Coiffeur, Client } = req.body;
    console.log({ email, motDePasse, Coiffeur, Client });

    try {
        let pool = await sql.connect(config);
        let user;

        if(Client) {
            let result = await pool.request().query(`
                SELECT * FROM Client WHERE email = '${email}'
            `);

            if (result.recordset.length === 0) {
                return res.status(401).json({ message: "Email ou mot de passe incorrect." });
            }

            user = result.recordset[0];
        }

        if(Coiffeur) {
            let result = await pool.request().query(`
                SELECT * FROM Coiffeur WHERE email = '${email}'
            `);

            if (result.recordset.length === 0) {
                return res.status(401).json({ message: "Email ou mot de passe incorrect." });
            }

            user = result.recordset[0];
            console.log({user});
            console.log({result});
        }
        if (Coiffeur === undefined && Client === undefined) {
            return res.status(400).json({ message: "Veuillez sélectionner un type d'utilisateur." });
        }
        console.log({user});
        // Vérifier le mot de passe
        const passwordMatch = await bcrypt.compare(motDePasse, user.motDePasseEncrypte);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        // Générer le jeton JWT
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });

        console.log({ token, message: "Connexion réussie." });

        // Envoyer le jeton dans le corps de la réponse
        if(Client) {
            res.redirect(`/?token=${token}&user=client`);
        }
        if(Coiffeur) {
            res.redirect(`/?token=${token}&user=coiffeur`);
        }
    } catch (error) {
        console.error("SQL error", error);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
});

router.post("/update-password", async (req, res) => {
    const { email, password, confirmPassword, userType } = req.body;

    // Check if the new password matches the confirm password
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
    }

    try {
        // Hash the new password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Determine the table name based on user type
        let tableName = '';
        if (userType === 'coiffeur') {
            tableName = 'Coiffeur';
        } else if (userType === 'client') {
            tableName = 'Client';
        } else {
            return res.status(400).json({ message: "Type d'utilisateur non valide." });
        }

        // Update the user's password in the database
        let pool = await sql.connect(config);
        let request = pool.request();

        await request.query(`
            UPDATE ${tableName}
            SET motDePasseEncrypte = '${encryptedPassword}'
            WHERE email = '${email}'
        `);

        console.log("Password updated successfully.");
        res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
    } catch (error) {
        console.error("SQL error", error);
        res.status(500).json({ message: "Erreur interne du serveur lors de la mise à jour du mot de passe." });
    }
});

module.exports = router;
