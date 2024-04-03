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
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "doe089432@gmail.com",
        pass: "asffafAASDA_kjfkaj123",
    },
});

async function sendResetPassword(courriel) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Dwan inc." <doe089432@gmail.com>', // sender address
        to: courriel, // list of receivers
        subject: "Reset your password?", // Subject line
        text: "Did u try to reset your password?, if yes click on the link below",
        html: "<a href='http://localhost:3000/update-password-page'>Click here to reset your password</a>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
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

        console.log({ message: "Email de réinitialisation envoyé." });
        res.json({ message: "Email de réinitialisation envoyé." });
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
    sendResetPassword(email).then(r => {
        res.json({ message: "Email de réinitialisation envoyé.", r });
    });
});

module.exports = router;
