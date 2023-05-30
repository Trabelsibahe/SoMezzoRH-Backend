const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const app = express();
const port = 3030;
const cors = require("cors");
const passport = require("passport");
const profileRoute = require("./routes/profile");
const archiveRoute= require ("./routes/archive")
const newsletterRoute= require ("./routes/newsletter");
const absenceRoute = require ("./routes/absence");
const operationRoute = require ("./routes/operation");
const ChallengeRoute = require("./routes/Challenges");
const demandeRoute = require("./routes/demande");
const notificationRoute = require("./routes/notification");
const rdvRoute = require("./routes/rdv");
const archiverdvRoute = require("./routes/archiverdv");
const user = require("./models/user");
const userController = require("./controllers/userController")
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

//static avatar Folder
app.use('/uploadsavatar', express.static('./uploadsavatar'))
//static justification  Folder
app.use('/uploadsjustif', express.static('./uploadsjustif'))
//static attestation  Folder
app.use('/uploadsattestation', express.static('./uploadsattestation'))
// archive
app.use("/api", archiveRoute);
// archive
app.use("/api", archiverdvRoute);
// notification
app.use("/api", notificationRoute);
// demande
app.use("/api", demandeRoute);
// sante
app.use("/api", rdvRoute);
// absence
app.use("/api", absenceRoute);

// newsletter
app.use("/api", newsletterRoute);

// operation
app.use("/api", operationRoute );

// Challenges
app.use("/api", ChallengeRoute );

//register login
app.use("/api", userRoute);

//static Images Folder
app.use('/uploads', express.static('./uploads'))
app.get("/api", (req, res) => {
    res.send("Welcome to SoMezzoRH API. :)");
  });
  app.post('/mot-de-passe-oublie', (req, res) => {
    const email = req.body.email;
    userController.sendPasswordResetEmail(email, res)
      .then(() => {
        return res.status(200).json({ message: "Un e-mail de réinitialisation de mot de passe a été envoyé." });
      })
      .catch((error) => {
        res.status(500).json({ message: "Une erreur s'est produite lors de l'envoi de l'e-mail de réinitialisation." });
      });
  });
 

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
