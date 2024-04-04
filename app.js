const express = require('express');
const app = express();
const path = require('path');
const { sql, config } = require('./db');
const { getSalonData } = require('./fonctionDb');
const port = 3000;

app.use(express.json());

// Serve static files from the 'accueil' directory inside 'applicationClient'
app.use(express.static(path.join(__dirname, 'applicationClient', 'accueil')));

// Serve accueil.html for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'applicationClient', 'accueil', 'accueil.html'));
});

// Define endpoint to fetch salon data from the database
app.get('/salon', getSalonData); // Use the imported function

// Start the server
app.listen(port, () => {
  console.log("Server is running on port", port);
});