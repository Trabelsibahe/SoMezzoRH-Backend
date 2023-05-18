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

// get all notifications 
router.get("/notifications",
  passport.authenticate("jwt", { session: false }), inRole(ROLES.EXPERT),
  notificationController.FindNotifications);
// get all notifications 
router.post("/journal/expert",
  passport.authenticate("jwt", { session: false }),
  notificationController.sendNotificationToExperts);

// get my notifications 
router.get("/mynotification",
  passport.authenticate("jwt", { session: false }),
  notificationController.getNotificationsByUserId);

  // mark as read by id
router.post("/setnotification/:notificationId",
passport.authenticate("jwt", { session: false }),
notificationController.SetNotificationRead);

module.exports = router;