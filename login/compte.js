const express = require("express");
const router = express.Router();
const { ConnectionPool } = require("mssql");
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
    const { nom, prenom, motDePasse, email, numeroTelephone } = req.body;
    console.log(req.body);

    // Hash the password
    const encryptedPassword = await bcrypt.hash(motDePasse, 10);

    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
            INSERT INTO Client (nom, prenom, motDePasse, email, numeroTelephone)
            VALUES ('${nom}', '${prenom}', '${encryptedPassword}', '${email}', '${numeroTelephone}')
        `);

        // Generate JWT token
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
        console.log({ token, message: "Registration successful." });
        res.redirect("/connexion");
        Alert("Inscription réussie");
    } catch (error) {
        console.error("SQL error", error);
        res.json({ status: "error", message: "Registration failed. Internal server error." });
    }
});

router.post("/login", async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request().query(`
            SELECT * FROM Client WHERE email = '${email}'
        `);

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        const user = result.recordset[0];

        const passwordMatch = await bcrypt.compare(motDePasse, user.motDePasse);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });

        console.log({ token, message: "Connexion réussie." });

        // Send token in response body
        res.redirect(`/?token=${token}`);
    } catch (error) {
        console.error("SQL error", error);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
});

module.exports = router;
