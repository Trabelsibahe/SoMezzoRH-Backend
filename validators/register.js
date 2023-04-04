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
    errors.nom = "entrez nom ";
  }
  if (validator.isEmpty(data.prenom)) {
    errors.prenom = "entrez prenom ";
  }
  if (validator.isEmpty(data.operation)) {
    errors.operation = "entrez operation ";
  }
  if (validator.isEmpty(data.active)) {
    errors.active = "active oui ou non";
  }
  if (validator.isEmpty(data.matricule)) {
    errors.matricule = "Veuillez entrez le matricule";
  }
  if (validator.isEmpty(data.role)) {
    errors.role = "Veuillez choisir le role";
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
