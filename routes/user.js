const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const { ROLES, inRole } = require("../security/Rolemiddleware");

// registration
router.post("/register", userController.Register);
// login
router.post("/login", userController.Login);

module.exports = router;
