const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateProfile(data) {
  let errors = {};

  data.tel = !isEmpty(data.tel) ? data.tel : "";
  data.ville = !isEmpty(data.ville) ? data.ville : "";
  data.pays = !isEmpty(data.pays) ? data.pays : "";
  data.codepostal = !isEmpty(data.codepostal) ? data.codepostal : "";


  // Valider le fichier dans file

 /*  if (!file || Object.keys(file).length === 0) {
    errors.avatar = "Veuillez télécharger une image";
  } */

  if (validator.isEmpty(data.tel)) {
    errors.tel = "Veuillez entrer votre numéro ";
  }
  if (validator.isEmpty(data.ville)) {
    errors.ville = "Veuillez entrer votre ville. ";
  }
  if (validator.isEmpty(data.pays)) {
    errors.pays = "Veuillez entrez votre pays ";
  }

  if (validator.isEmpty(data.codepostal)) {
    errors.codepostal = "Veuillez entrez votre code postal";
  }



  return {
    errors,
    isValid: isEmpty(errors)
  }
};
