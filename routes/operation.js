
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

router.get("/operation/absence", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.RRH),
AbsenceController.ListerabsenceOperation);


router.get("/operation/absences2", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.RRH),
AbsenceController.ListerabsenceOperation2);

router.get("/operation/task", 
passport.authenticate("jwt", { session: false }),
//inRole(ROLES.RRH),
AbsenceController.ListerTaskOperation);
router.post("/operation/task/add", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.RRH),
AbsenceController.addTaskOperation);
module.exports = router;

