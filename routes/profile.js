
const express = require('express');

const router = express.Router();

const ProfileController = require('../controllers/profileController');

const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");


/* add profile route */
router.post("/profile/create", 
passport.authenticate("jwt", { session: false }),
ProfileController.CreateProfile);

/* get one profiles */
router.get("/profile/get", 
passport.authenticate("jwt", { session: false }),
ProfileController.FindSingleProfile);


//admin
/* get all profiles */
router.get("/profiles", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.EXPERT),
ProfileController.FindAllProfiles);

/* delete profiles */
router.delete("/profiles/:id", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.EXPERT),
ProfileController.DeleteProfile);

/* modifier profile */
router.post("/profile/:id", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.EXPERT),
ProfileController.modifierContact);
/* supprimer profile */
router.delete("/profilesupp/:id", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.EXPERT),
ProfileController.deleteAndArchiveProfile);

router.get("/serchmatricule", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.EXPERT),
ProfileController.searchByMatricule);
module.exports = router;