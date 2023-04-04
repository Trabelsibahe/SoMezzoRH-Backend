const express = require('express');

const router = express.Router();

const ArchiveController = require('../controllers/archiveController');

const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");


//admin
/* get all archive */
router.get("/archive/get", 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.EXPERT),
 ArchiveController.FindArchive, );
 
/* supprimer archive */
router.delete("/archive/supp/:id", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.EXPERT),
ArchiveController.deleteArchive);
module.exports = router;