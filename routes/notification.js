const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");


//create notification 
router.post(
    '/notification/create',
    passport.authenticate('jwt', { session: false }),
    notificationController.createNotification,
  );


// get my notifications 
router.get("/notifications", 
passport.authenticate("jwt", { session: false }),
notificationController.FindNotifications);


module.exports = router;