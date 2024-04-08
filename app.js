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
const functionDb = require('./fonctionDb');

app.get('/getSalonData', functionDb.getSalonData);
app.get('/getReservationData', functionDb.getReservationData);
app.get('/getSalonDataBySalonId', async (req, res) => {
  const salonId = req.query.salonId;
  try {
      const salonDetails = await functionDb.getSalonDataBySalonId(salonId);
      res.json(salonDetails);
  } catch (error) {
      console.error('Error fetching salon details:', error);
      res.status(500).send('Error fetching salon details');
  }
});

// Start the server
app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
