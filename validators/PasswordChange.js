const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidatePasswordChange(data) {


    let errors = {};

    data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : "";
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
    data.pConfirm = !isEmpty(data.pConfirm) ? data.pConfirm : "";


    if (validator.isEmpty(data.oldPassword)) {
        errors.oldPassword = "Donner l'ancien mot de passe";
    }
    if (validator.isEmpty(data.newPassword)) {
        errors.newPassword = "Donner le nouveau mot de passe";
    }

    if (!validator.equals(data.newPassword, data.pConfirm)) {
        errors.pConfirm = "verifier le mot de passe ";
    }
    if (validator.isEmpty(data.pConfirm)) {
        errors.pConfirm = "Entrer la confirmation de nouveau mot de passe";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }

}