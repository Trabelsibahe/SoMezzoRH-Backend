const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateRegister(data) {
  let errors = {};
 
  data.nom = !isEmpty(data.nom) ? data.nom : "";
  data.prenom = !isEmpty(data.prenom) ? data.prenom : "";
  data.operation = !isEmpty(data.operation) ? data.operation : "";
  data.active = !isEmpty(data.active) ? data.active : "";

  data.matricule = !isEmpty(data.matricule) ? data.matricule : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm = !isEmpty(data.confirm) ? data.confirm : "";
  
//test+msg erreur 
  if (validator.isEmpty(data.nom)) {
    errors.nom = "Veuillez saisir un nom.";
  }
  if (validator.isEmpty(data.prenom)) {
    errors.prenom = "Veuillez saisir un prénom.";
  }
  if (validator.isEmpty(data.operation)) {
    errors.operation = "Veuillez entrer le nom de l'opération.";
  }
  if (validator.isEmpty(data.active)) {
    errors.active = "Status active True or False.";
  }
  if (validator.isEmpty(data.matricule)) {
    errors.matricule = "Veuillez entrer une matricule valide.";
  }
  if (validator.isEmpty(data.role)) {
    errors.role = "Veuillez choisir un role.";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Veuillez entrez un mot de passe.";
  }
  if(!validator.equals(data.password, data.confirm)){
    errors.confirm = "Veuillez verifier le mot de passe.";
  }
  if (validator.isEmpty(data.confirm)) {
    errors.confirm = "Veuillez confirmer le mot de passe.";
  }
  


  return {
      errors,
      isValid: isEmpty(errors)
  }
};
