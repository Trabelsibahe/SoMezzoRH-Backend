const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateProfile(data) {
  let errors = {};

  data.tel = !isEmpty(data.tel) ? data.tel : "";
  data.ville = !isEmpty(data.ville) ? data.ville : "";
  data.pays = !isEmpty(data.pays) ? data.pays : "";
  data.codepostal = !isEmpty(data.codepostal) ? data.codepostal : "";
  data.adresse = !isEmpty(data.adresse) ? data.adresse : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.datenaiss = !isEmpty(data.datenaiss) ? data.datenaiss : "";
  data.gouvernorat = !isEmpty(data.gouvernorat) ? data.gouvernorat : "";


  // Valider le fichier dans file

 /*  if (!file || Object.keys(file).length === 0) {
    errors.avatar = "Veuillez télécharger une image";
  } */

  if (validator.isEmpty(data.tel)) {
    errors.tel = "Veuillez entrer votre Numéro de téléphone.";
  }
  if (validator.isEmpty(data.ville)) {
    errors.ville = "Veuillez entrer votre Ville. ";
  }
  if (validator.isEmpty(data.pays)) {
    errors.pays = "Veuillez entrer votre Pays.";
  }

  if (validator.isEmpty(data.codepostal)) {
    errors.codepostal = "Veuillez entrer votre Code postal.";
  }
  if (validator.isEmpty(data.adresse)) {
    errors.adresse = "Veuillez entrer votre Adresse.";
  }
  if (validator.isEmpty(data.gouvernorat)) {
    errors.gouvernorat = "Veuillez entrer votre Gouvernorat.";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Veuillez entrer votre email.";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Veuillez donner un email valide.";
  }
  if (!validator.isDate(data.datenaiss)) {
    errors.datenaiss = "Veuillez entrer votre Date de naissance.";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
};
