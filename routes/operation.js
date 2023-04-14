
const express = require('express');
const router = express.Router();
const AbsenceController = require('../controllers/operationController');
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");
const multer = require('multer')



// Afficher la liste des employés dans une opération pour L'RRH.

router.get("/operation", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.RRH),
AbsenceController.ListerOperation);


module.exports = router;

