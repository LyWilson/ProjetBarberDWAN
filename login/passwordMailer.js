const express = require("express");
const router = express.Router();
const { ConnectionPool } = require("mssql");
const bodyParser = require("body-parser");
const config = require("../db");
const { sql } = require("../db");
const bcrypt = require("bcrypt");
const apikey = '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';
const sendGrid = require('@sendgrid/mail');
sendGrid.setApiKey(apikey);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Create MSSQL pool

async function sendResetPassword(email) {
    const msg = {
        to: email,
        from: 'incdwan@gmail.com',
        subject: 'Réinitialiser votre mot de passe',
        text: 'Cliquez sur le lien pour réinitialiser votre mot de passe',
        html: "<a href='http://localhost:3000/update-password-page'>Réinitialiser votre mot de passe</a>"
    };
    try {
        await sendGrid.send(msg);
        console.log('Courriel envoyé');
    } catch (error) {
        console.log('Erreur lors de l\'envoi du courriel:', error);
        throw error;
    }
}

// avant d'envoyer le courriel, il faut vérifier si l'adresse courriel existe dans la base de données
// cette route est utilisée pour vérifier si l'adresse courriel existe dans la base de données avant
// d'envoyer le courriel de réinitialisation du mot de passe
router.post("/reset-password", async (req, res) => {
    const { email } = req.body;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request().query(`
            SELECT * FROM Client WHERE email = '${email}'
        `);

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: "Email non trouvé." });
        }

        // Send reset password email
        await sendResetPassword(email);
        Alert("Un email de réinitialisation du mot de passe a été envoyé à " + email + "(Vérifiez votre boîte de courriel indésirables si vous ne le trouvez pas dans votre boîte de réception)");
        res.redirect("/connexion");
    } catch (error) {
        console.error("SQL error", error);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
});

router.post("/update-password", async (req, res) => {
    const { email, motDePasse } = req.body;

    // Hash the password
    const encryptedPassword = await bcrypt.hash(motDePasse, 10);

    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
            UPDATE Client
            SET motDePasse = '${encryptedPassword}'
            WHERE email = '${email}'
        `);

        console.log({ message: "Mot de passe mis à jour." });
        res.json({ message: "Mot de passe mis à jour." });
    } catch (error) {
        console.error("SQL error", error);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
});

router.post("/MDPoublier.html", (req, res) => {
    const { email } = req.body;
    sendResetPassword(email)
        .then(() => {
            res.redirect("/");
        })
        .catch((error) => {
            console.error("Error sending email:", error);
            res.status(500).json({ message: "Erreur interne du serveur." });
        });
});

module.exports = router;
