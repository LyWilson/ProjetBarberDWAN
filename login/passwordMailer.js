const express = require("express");
const router = express.Router();
const {ConnectionPool} = require("mssql");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const config = {
    user: 'admin',
    password: 'admin',
    server: 'localhost',
    database: 'Barbier',
    port: 1390,
    options: {
        trustServerCertificate: true,
        encrypt: true
    }
};

// Create MSSQL pool
const pool = new ConnectionPool(config);
pool.connect();

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'incdwan@gmail.com',
        pass: 'PZD-xfg-wyd*tra6cwv'
    }
});

async function sendResetPassword(courriel) {
    try {
        await transporter.sendMail({
            to: '"Dwan inc." <matteo.bosco41@ethereal.email>',
            from: ["lywilson01@gmail.com"],
            subject: "Reset your password?",
            text: "Did you try to reset your password? If yes, click on the link below",
            html: "<a href='http://localhost:3000/update-password-page'>Click here to reset your password</a>"
        });

        console.log("Message sent to:", courriel);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}


router.post("/reset-password", async (req, res) => {
    const { email } = req.body;

    try {
        const request = pool.request();
        const result = await request.query(`
            SELECT * FROM Client WHERE email = '${email}'
        `);

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: "Email non trouvé." });
        }

        // Send reset password email
        await sendResetPassword(email);

        res.redirect("/")
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
        const request = pool.request();
        await request.query(`
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
            res.redirect("/")
        });
});

module.exports = router;
