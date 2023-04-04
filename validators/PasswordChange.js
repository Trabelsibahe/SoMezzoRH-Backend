const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidatePasswordChange(data) {


    let errors = {};

    data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : "";
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
    data.pConfirm = !isEmpty(data.pConfirm) ? data.pConfirm : "";


    if (validator.isEmpty(data.oldPassword)) {
        errors.oldPassword = "Veuillez saisir l'ancien mot de passe.";
    }
    if (validator.isEmpty(data.newPassword)) {
        errors.newPassword = "Veuillez saisir le nouveau mot de passe.";
    }

    if (!validator.equals(data.newPassword, data.pConfirm)) {
        errors.pConfirm = "Veuillez verifier le mot de passe.";
    }
    if (validator.isEmpty(data.pConfirm)) {
        errors.pConfirm = "Veuillez confirmer le nouveau mot de passe.";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }

}