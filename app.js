const express = require('express');
const app = express();
const path = require('path');
const { getSalonData } = require('./fonctionDb');

const route = require('./login/route');
const passwordMailer = require('./login/passwordMailer');
const inscription = require('./login/inscription');

app.use("/", route)
app.use("/", passwordMailer)
app.use("/", inscription)


app.use(express.json());

// Serve static files from the 'accueil' directory inside 'applicationClient'
app.use(express.static(path.join(__dirname, 'applicationClient', 'accueil')));

// Serve accueil.html for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'applicationClient', 'accueil', 'accueil.html'));
});

app.get('/salon', getSalonData);
app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
