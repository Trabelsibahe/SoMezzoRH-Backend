const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");


router.post("/add/task", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.RRH),
taskController.ajouterTask);

router.get("/get/task", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.RRH),
taskController.listerTask);

router.get("/getall/task", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.EXPERT),
taskController.listerTask);
module.exports = router;