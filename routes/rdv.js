const express = require('express');
const router = express.Router();
const RdvController = require('../controllers/rdvController');
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");


//ajouter date de rdv avec medcin
router.post("/date/add", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.EXPERT),
RdvController.ajouterdate);

//afficher le date de rdv avec medcin 
router.get("/date/afficher", 
passport.authenticate("jwt", { session: false }),
RdvController.afficherdv);

//recupere mes rdv
router.get("/rdv/afficher", 
passport.authenticate("jwt", { session: false }),
RdvController.MesRDV);

//ajouter une demande de rdv avec medcin 
router.post("/rdv/add", 
passport.authenticate("jwt", { session: false }),
RdvController.ajouterdemande);

//modifier etat si accepter ne depasse pas 5 utilisateur 
router.post("/date/etat/:id", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.EXPERT),
RdvController.etatrdv);

// afficher tous les absences
router.get("/demande/afficher", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.EXPERT),
RdvController.afficherdemande);
/* Archive profile */
router.delete("/rdvsupp", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.EXPERT),
RdvController.archiverRdv);
module.exports = router;
