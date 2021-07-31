// server.js
// where your node app starts

const express = require("express");
const app = express();
require('dotenv').config();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/views/dashboard.html");
});

app.get("/login", (req, res) => {
  //perform some action
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on localhost:" + listener.address().port);
});
