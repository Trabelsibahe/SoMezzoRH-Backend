const express = require('express');

const router = express.Router();

const ArchiverdvController = require('../controllers/archiverdvController');

const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");


//admin
/* get all archive */
router.get("/archiverdv/get",
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.EXPERT),
    ArchiverdvController.FindArchiverdv,);

module.exports = router;