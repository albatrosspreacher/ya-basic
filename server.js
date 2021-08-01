// server.js
// where your node app starts

const express = require("express");
const app = express();
require("dotenv").config();

// setting up express
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("cookie-parser")());
app.use(require("cors")());
app.use(require("morgan")("tiny"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/views/dashboard.html");
});

app.use("/auth", require("./routes/auth"));

// ;)
app.get("/buddy", (req, res) => {
  res.redirect("https://media.giphy.com/media/l1KdbHUPe27GQsJH2/giphy.gif");
});

// for all undefined routes:
app.use((req, res, next) => res.status(404).end("Route not found."));

// listen for requests :) (I changed port to 3000 for testing ok dont get mad
// it'll still work when hosted)
const PORT = process.env.PORT || 3000;
const listener = app.listen(PORT, () => {
  console.log("Your app is listening on localhost:" + listener.address().port);
});
