const express = require('express');
const router = express.Router();
const SanteController = require('../controllers/santeController');
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");



/* add RDV */
router.post("/rdv/add", 
passport.authenticate("jwt", { session: false }),
SanteController.ajouterdemandeRdv);

/* get all RDV */
router.get("/rdv/get", 
passport.authenticate("jwt", { session: false }),
SanteController.FindAllDemandeRdv);

/* modif RDV */
router.post("/rdv/modif/:id", 
passport.authenticate("jwt", { session: false }),
SanteController.modifierDemandeRdv);
/* get one RDV */
router.get("/rdv/getone/:id", 
passport.authenticate("jwt", { session: false }),
SanteController.FindDemandeRDV);
module.exports = router;
