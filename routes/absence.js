
const express = require('express');

const router = express.Router();

const AbsenceController = require('../controllers/absenceController');

const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");



/* add absence route */
router.post("/absence/add", 
passport.authenticate("jwt", { session: false }),
AbsenceController.CreateAbsence);


/* get one absence */
router.get("/absence/getone", 
passport.authenticate("jwt", { session: false }),
AbsenceController.FindAbsences);



/* get one absence */
router.get("/absence/getall", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.EXPERT),
AbsenceController.FindAllAbsences);


module.exports = router;

