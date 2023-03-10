const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateLogin(data) {
  let errors = {};


  data.matricule = !isEmpty(data.matricule) ? data.matricule : "";
  data.password = !isEmpty(data.password) ? data.password : "";


 
 /**  if (!validator.isEmail(data.email)) {
    errors.email = "Required format email";
  }*/

//test+msg erreur 
  if (validator.isEmpty(data.matricule)) {
    errors.matricule = "entrez votre matricule";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "entrez votre mot de passe";
  }
 


  return {
      errors,
      isValid: isEmpty(errors)
  }
};
