const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateChallenge(data) {
  let errors = {};

  data.titre = !isEmpty(data.titre) ? data.titre : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.dateCreation = !isEmpty(data.dateCreation) ? data.dateCreation : "";
  data.dateSuppression = !isEmpty(data.dateSuppression) ? data.dateSuppression : "";
  data.priorite = !isEmpty(data.priorite) ? data.priorite : "";
  data.prime = !isEmpty(data.prime) ? String(data.prime) : "";

  if (validator.isEmpty(data.titre)) {
    errors.titre = "Veuillez entrer le titre.";
  }
  if (validator.isEmpty(data.description)) {
    errors.description = "Veuillez entrer la description ";
  }
  if (validator.isEmpty(data.dateCreation)) {
    errors.dateCreation = "Veuillez entrer la date de Creation";
  }

  if (validator.isEmpty(data.dateSuppression)) {
    errors.dateSuppression = "Veuillez entrer votre la date de Suppression";
  }
  if (validator.isEmpty(data.priorite)) {
    errors.priorite = "Veuillez entrer la priorite";
  }
  if (!validator.isNumeric(data.prime)) {
    errors.prime = "Veuillez entrer un nombre pour le prime";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
};
