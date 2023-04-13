
const express = require('express');

const router = express.Router();

const ProfileController = require('../controllers/profileController');

const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");

const multer = require('multer')
const upload = multer({dest:'uploadsavatar/'})

/* add profile route */
router.post("/profile/create", 
passport.authenticate("jwt", { session: false }),
upload.single('avatar'),
ProfileController.CreateProfile);

/* get one profiles */
router.get("/profile/get", 
passport.authenticate("jwt", { session: false }),
ProfileController.FindSingleProfile);

 /* modif profile connecter */
 router.post("/profile/modif", 
 passport.authenticate("jwt", { session: false }),
 upload.single('avatar'),
 ProfileController.modifierprofile);

//admin
/* get all profiles */
router.get("/profiles", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.EXPERT),
ProfileController.FindAllProfiles);

/* modifier profile */
router.post("/profile/:id", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.EXPERT),
ProfileController.modifierProfileById);

/* Archive profile */
router.delete("/profilesupp/:id", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.EXPERT),
ProfileController.deleteAndArchiveProfile);

/* counter profiles */
router.get("/nb/profiles", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.EXPERT),
ProfileController.countProfiles);

module.exports = router;