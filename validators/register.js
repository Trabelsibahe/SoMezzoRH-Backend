const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateRegister(data) {
  let errors = {};
 
  data.utilisateur = !isEmpty(data.utilisateur) ? data.utilisateur : "";
  data.matricule = !isEmpty(data.matricule) ? data.matricule : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm = !isEmpty(data.confirm) ? data.confirm : "";
  
//test+msg erreur 
  if (validator.isEmpty(data.utilisateur)) {
    errors.utilisateur = "entrez nom et prenom ";
  }
  
  /**if (!validator.isEmail(data.email)) {
    errors.email = "Required format email";
  }*/

  if (validator.isEmpty(data.matricule)) {
    errors.matricule = "Veuillez entrez le matricule";
  }
  if (validator.isEmpty(data.role)) {
    errors.matricule = "Veuillez choisir le role";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Veuillez entrez le mot de passe";
  }
  if(!validator.equals(data.password, data.confirm)){
    errors.confirm = "verifier le mot de pass ";
  }
  if (validator.isEmpty(data.confirm)) {
    errors.confirm = "Veuillez entrez la confirmation de mot de passe";
  }
  


  return {
      errors,
      isValid: isEmpty(errors)
  }
};
