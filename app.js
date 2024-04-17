const express = require('express');
const app = express();


const route = require('./route');
const passwordMailer = require('./login/passwordMailer');
const inscription = require('./login/compte');
const AppClientReq = require('./applicationClient/AppClientReq');
const AppCoiffeurReq = require('./applicationCoiffeur/AppCoiffeurReq')

app.use("/", route)
app.use("/", passwordMailer)
app.use("/", inscription)
app.use("/", AppClientReq)
app.use("/", AppCoiffeurReq)


app.use(express.json());

// Route pour obtenir les données
const fonctionDb = require('./fonctionDb');
app.get('/getSalonData', fonctionDb.getSalonData);
app.get('/getSalonDataBySalonId', fonctionDb.getSalonDataBySalonId);
app.get('/getReservationData', fonctionDb.getReservationData);

// Serveur en écoute sur le port 3000
app.listen(3000, () => {
  console.log(`Server started on port 3000`);
  console.log('commit 168')
});
