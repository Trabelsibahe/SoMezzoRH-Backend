const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidatedemandeRdv(data) {
  let errors = {};

  data.commentaire = !isEmpty(data.commentaire) ? data.commentaire : "";
  
  if (validator.isEmpty(data.commentaire)) {
    errors.commentaire = "Veuillez entrer votre problem";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
};
