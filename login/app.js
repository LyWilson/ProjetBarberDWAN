const express = require("express");
const app = express();

const route = require('./route');
const passwordMailer = require('./passwordMailer');
const inscription = require('./inscription');

app.use("/", route)
app.use("/", passwordMailer)
app.use("/", inscription)

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
