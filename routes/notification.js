const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");


//Send notification to all
router.post(
  '/notification/create',
  passport.authenticate('jwt', { session: false }),
  notificationController.sendNotificationToAll,
);

//Send notification to One User
router.post(
  '/notification/create/:userId',
  passport.authenticate('jwt', { session: false }),
  notificationController.sendNotificationtoOneUser,
);

// get my notifications 
router.get("/notifications",
  passport.authenticate("jwt", { session: false }),
  notificationController.FindNotifications);

// get my notifications 
router.get("/mynotification",
  passport.authenticate("jwt", { session: false }),
  notificationController.getNotificationsByUserId);
  // get my notifications 
router.post("/setnotification/:notificationId",
passport.authenticate("jwt", { session: false }),
notificationController.SetNotificationRead);

module.exports = router;