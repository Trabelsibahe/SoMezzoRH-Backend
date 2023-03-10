const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const app = express();
const port = 3030;


// path
app.use(express.json());



// Routes
app.get("/", (req, res) => {
    res.send("SoMezzoRH Server");
});

// 1
app.get("/api", (req, res) => {
    res.send("Welcome to SoMezzoRH API. :)");
  });
  
  //register login
app.use("/api", userRoute);

// hedhi rabta mabin backend o bd
mongoose.connect("mongodb://127.0.0.1:27017/somezzo_rh", {
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
