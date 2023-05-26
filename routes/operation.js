
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

router.get("/operation/participants/:id", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.RRH),
OperationController.ListerOperationparticiper);

//counter nb d'operation 
router.get("/nb/operation", 
passport.authenticate("jwt", { session: false }),
OperationController.countOperation);

//counter nb de challenge  
router.get("/nb/challenge", 
passport.authenticate("jwt", { session: false }),
OperationController.countchallenge);

router.post("/operation/Challenge/add", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.RRH),
OperationController.addChallengeOperation);
router.post(
    "/participer/:id",
    passport.authenticate("jwt", { session: false }),
    OperationController.participerChallenge
  );
module.exports = router;

