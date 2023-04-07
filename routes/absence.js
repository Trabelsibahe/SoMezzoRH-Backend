
const express = require('express');

const router = express.Router();

const AbsenceController = require('../controllers/absenceController');

const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");



/* add absence route */
router.post("/absence/add", 
passport.authenticate("jwt", { session: false }),
AbsenceController.CreateAbsence);
module.exports = router;