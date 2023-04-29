const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function Validatedemande(data) {
  let errors = {};

  data.type = !isEmpty(data.type) ? data.type : "";
  data.etat = !isEmpty(data.etat) ? data.etat : "";
  
  if (validator.isEmpty(data.type)) {
    errors.type = "Veuillez entrer le type.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
};
