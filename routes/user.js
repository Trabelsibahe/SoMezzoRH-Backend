const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");

// registration
router.post("/register", userController.Register);
// login
router.post("/login", userController.Login);
//mofdifier motpass
router.post("/modifmotpass", passport.authenticate("jwt", { session: false }),userController.modifmotpass);

router.get("/user", passport.authenticate('jwt', { session: false }), inRole(ROLES.EMP), userController.EMP);

router.get("/admin", passport.authenticate('jwt', { session: false }),inRole(ROLES.EXPERT, ), userController.EXPERT, );

module.exports = router;
