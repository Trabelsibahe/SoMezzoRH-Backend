const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const multer = require('multer')
const upload = multer({dest:'uploads/'})
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");


//admin
router.post(
    '/add/news',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.EXPERT),
    upload.single('imgurl'),
    newsletterController.ajouterNews,
  );
  /* delete newsletter */
  router.delete("/news/supp", 
  passport.authenticate("jwt", { session: false }),
  inRole(ROLES.EXPERT),
  newsletterController.supprimerNews);
/* get all news */
router.get("/get/news", 
passport.authenticate("jwt", { session: false }),
newsletterController.listerNews);
module.exports = router;