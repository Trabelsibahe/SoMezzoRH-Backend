const express = require('express');
const router = express.Router();
const ChallengesController = require('../controllers/ChallengesController');
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");


router.post("/add/Challenge", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.RRH),
ChallengesController.ajouterChallenge);

router.get("/get/Challenge", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.RRH),
ChallengesController.listerChallenge);

router.get("/allChallenges", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.EXPERT),
ChallengesController.listerChallenge);

router.delete("/Challenge/supp", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.RRH),
ChallengesController.supprimerChallenge);


module.exports = router;