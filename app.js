// Importation des modules
const express = require('express');
const app = express();
const route = require('./route');
const passwordMailer = require('./login/passwordMailer');
const inscription = require('./login/compte');

app.use("/", route)
app.use("/", passwordMailer)
app.use("/", inscription)


app.use(express.json());

// Importation des fonctions de la base de données
const { getSalonData } = require('./fonctionDb');
const { getReservationData } = require('./fonctionDb');
const { getSalonDataBySalonId } = require('./fonctionDb');	

app.get('/getSalonData', getSalonData);
app.get('/getReservationData', getReservationData);
app.get('/getSalonDataBySalonId', getSalonDataBySalonId);



// Start the server
app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
