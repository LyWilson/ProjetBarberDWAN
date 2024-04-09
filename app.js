const express = require('express');
const app = express();
const { getSalonData } = require('./fonctionDb');

const route = require('./route');
const passwordMailer = require('./login/passwordMailer');
const inscription = require('./login/compte');

app.use("/", route)
app.use("/", passwordMailer)
app.use("/", inscription)


app.use(express.json());

app.get('/salon', getSalonData);
app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
