const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

var app = express()
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running correctly" });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("Successfully loaded");
});