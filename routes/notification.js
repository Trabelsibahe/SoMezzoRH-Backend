const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");


//ajouter notification 
router.post(
    '/add/notification',
    passport.authenticate('jwt', { session: false }),
    notificationController.ajouternotification,
  );
// get all notification 
router.get("/get/notification", 
passport.authenticate("jwt", { session: false }),
notificationController.FindAllNotification);
module.exports = router;