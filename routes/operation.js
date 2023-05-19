
const express = require('express');
const router = express.Router();
const OperationController = require('../controllers/operationController');
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");
const multer = require('multer')



// Afficher la liste des employés dans une opération pour L'RRH.

router.get("/operation", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.RRH),
OperationController.ListerOperation);

router.get("/operation/absence", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.RRH),
OperationController.ListerabsenceOperation);


router.get("/operation/absences2", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.RRH),
OperationController.ListerabsenceOperation2);

router.get("/operation/myChallenge", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.RRH, ROLES.EMP),
OperationController.ListerChallengesOperation);


router.post("/operation/Challenge/add", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.RRH),
OperationController.addChallengeOperation);
module.exports = router;

