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
  if (validator.isEmpty(data.adresse)) {
    errors.adresse = "Veuillez entrez votre adresse";
  }
  if (validator.isEmpty(data.gouvernorat)) {
    errors.gouvernorat = "Veuillez entrez votre gouvernorat";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Veuillez entrer votre email correctement";
  }
  if (!validator.isDate(data.datenaiss)) {
    errors.datenaiss = "Veuillez entrer une date de naissance valide";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
};
