
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

//ajouter une challenge 
router.post("/operation/Challenge/add", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.RRH),
OperationController.addChallengeOperation);

//participer au challenge
router.post(
    "/participer/:id",
    passport.authenticate("jwt", { session: false }),
    OperationController.participerChallenge
  );
//counter le nb de participation total pour chaque user
router.get("/nb/:id", 
passport.authenticate("jwt", { session: false }),
OperationController.count);

//counter le nb des employe par operation
router.get("/nbemp/:id", 
passport.authenticate("jwt", { session: false }),
OperationController.countempop);

//counter le nb de total de chaque user
router.get("/nbtotal/:id", 
passport.authenticate("jwt", { session: false }),
OperationController.counttotal);

//counter le nb de participant 
router.get("/nbparticipant/:id", 
passport.authenticate("jwt", { session: false }),
OperationController.countParticipants);
module.exports = router;

