const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { ConnectionPool } = require('mssql');
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

// MSSQL Connection Config
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
    service: "gmail",
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

//page d'accueil dans dossier public et connexion.html
app.use(express.static(__dirname + "/Public"));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/Public', 'connexion.html'));
});

app.get("/inscription", (req, res) => {
    res.sendFile(path.join(__dirname + '/Public', 'inscription.html'));
});

app.use(express.static(__dirname + "/../pageClient"));
app.get("/AccueilClient", (req, res) => {
    res.sendFile(path.join(__dirname + '/../pageClient', 'pageAccueil.html'));
});
app.post("/register-client", async (req, res) => {
    const { nom, prenom, motDePasse, email, numeroTelephone } = req.body;
    console.log(req.body);

    // Hash the password
    const encryptedPassword = await bcrypt.hash(motDePasse, 10);

    try {
        const request = pool.request();
        const result = await request.query(`
            INSERT INTO Client (nom, prenom, motDePasse, email, numeroTelephone)
            VALUES ('${nom}', '${prenom}', '${encryptedPassword}', '${email}', '${numeroTelephone}')
        `);

        // Generate JWT token
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });

        // Send confirmation email
        const mailOptions = {
            from: "your_email@gmail.com",
            to: email,
            subject: "Registration Confirmation",
            text: `Welcome, ${prenom} ${nom}! You have successfully registered.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                res.json({ status: "ok", token, message: "Registration successful. Error sending confirmation email." });
            } else {
                console.log("Email sent:", info.response);
                console.log({ status: "ok", token, message: "Registration successful. Confirmation email sent." });
                res.redirect("/");
            }
        });
    } catch (error) {
        console.error("SQL error", error);
        res.json({ status: "error", message: "Registration failed. Internal server error." });
    }
});

app.get("/update-password-page", (req, res) => {
    res.sendFile(path.join(__dirname + '/Public', 'update-password.html'));
});

app.post("/login", async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        const request = pool.request();
        const result = await request.query(`
            SELECT * FROM Client WHERE email = '${email}'
        `);

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        const user = result.recordset[0];

        const passwordMatch = await bcrypt.compare(motDePasse, user.motDePasse);

        if (!passwordMatch) {
            // Si le mot de passe ne correspond pas
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        // Si l'email et le mot de passe sont corrects, générer un jeton JWT
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });

        console.log({ token, message: "Connexion réussie." });
        res.redirect("/AccueilClient");
    } catch (error) {
        console.error("SQL error", error);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
});

app.post("/reset-password", async (req, res) => {
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

app.post("/update-password", async (req, res) => {
    const { email, motDePasse } = req.body;

    // Hash the password
    const encryptedPassword = await bcrypt.hash(motDePasse, 10);

    try {
        const request = pool.request();
        const result = await request.query(`
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

app.post("/MDPoublier.html", (req, res) => {
    const { email } = req.body;
    sendResetPassword(email);
});

// Assuming other endpoints like login, reset password, etc., are already implemented

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
