const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function Validatedemande(data) {
  let errors = {};

  data.type = !isEmpty(data.type) ? data.type : "";
  data.commentaire = !isEmpty(data.commentaire) ? data.commentaire : "";
  data.etat = !isEmpty(data.etat) ? data.etat : "";
  
  if (validator.isEmpty(data.type)) {
    errors.type = "Veuillez entrer le type.";
  }
  if (validator.isEmpty(data.commentaire)) {
    errors.commentaire = "Veuillez entrer la commentaire ";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
};
