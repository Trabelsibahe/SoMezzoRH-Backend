const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const app = express();
const port = 3030;
const cors = require("cors");
const passport = require("passport");
const profileRoute = require("./routes/profile");
const archiveRoute= require ("./routes/archive")



// path
app.use(cors()); // rabta mte3 react @crossorigin
app.use(express.json());

// passport
app.use(passport.initialize())
require('./security/passport')(passport)

// Routes
app.get("/", (req, res) => {
    res.send("SoMezzoRH Server");
});

// profile
app.use("/api", profileRoute);

// archive
app.use("/api", archiveRoute);


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
