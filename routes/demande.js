const express = require('express');
const router = express.Router();
const DemandeController = require('../controllers/demandeController');
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");
const multer = require('multer')
const upload = multer({dest:'uploadsattestation/'})


/* add de route */
router.post("/demande/add", 
passport.authenticate("jwt", { session: false }),
upload.single('attestation'),
DemandeController.ajouterDemande);
/* add de route */
router.get("/demande/get", 
passport.authenticate("jwt", { session: false }),
DemandeController.FindAllDemande);
router.post("/demande/modif/:id", 
passport.authenticate("jwt", { session: false }),
DemandeController.modifierDemande);
router.post("/demande/add/:id", 
passport.authenticate("jwt", { session: false }),
upload.single('attestation'),
DemandeController.ajouterimage);
/* get demande route */
router.get("/demande/getone", 
passport.authenticate("jwt", { session: false }),
DemandeController.FindDemande);
module.exports = router;
