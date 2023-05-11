const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateNews(data,file) {
  let errors = {};

  data.titre = !isEmpty(data.titre) ? data.titre : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.dateSuppression = !isEmpty(data.dateSuppression) ? data.dateSuppression : "";
  data.imgurl = !isEmpty(data.imgurl) ? data.imgurl : "";

  if (validator.isEmpty(data.titre)) {
    errors.titre = "Veuillez entrer le titre.";
  }
  if (validator.isEmpty(data.description)) {
    errors.description = "Veuillez entrer la description ";
  }
  if (validator.isEmpty(data.dateSuppression)) {
    errors.dateSuppression = "Veuillez entrer votre la date de Suppression";
  }
  if (!file) {
    errors.imgurl = "Veuillez entrer l'image de newsletter";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
};
