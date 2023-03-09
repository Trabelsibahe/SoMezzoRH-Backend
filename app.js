const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3030;



// Routes
app.get("/", (req, res) => {
    res.send("SoMezzoRH Server");
});

// 1
app.get("/api", (req, res) => {
    res.send("Welcome to SoMezzoRH API. :)");
  });
  

// hedhi rabta mabin backend o bd
mongoose.connect("mongodb://localhost:27017/contactdb", {
  useNewUrlParser: true,
});

// hedhi bech naarf est ce que bd mte3i terbat wela le
const db = mongoose.connection;

db.on("error", console.error.bind("connection error")); // error

db.once("open", function () {
  console.log("MongoDB connected successfully :)"); // success
});

// port
app.listen(port, () => {
  console.log(
    `SoMezzoRH Backend :) App is listening on port http://localhost:${port}`
  );
});
