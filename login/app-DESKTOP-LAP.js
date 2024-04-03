const express = require("express");
const app = express();
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

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your_email@gmail.com",
        pass: "your_email_password",
    },
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
                res.json({ status: "ok", token, message: "Registration successful. Confirmation email sent." });
            }
        });
    } catch (error) {
        console.error("SQL error", error);
        res.json({ status: "error", message: "Registration failed. Internal server error." });
    }
});

// Assuming other endpoints like login, reset password, etc., are already implemented

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
