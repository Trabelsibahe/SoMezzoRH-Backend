const isEmpty = require("./isEmpty");
const validator = require("validator");
const { isBefore } = require("date-fns");

module.exports = function ValidateAbsence(data) {
  let errors = {};

  data.type = !isEmpty(data.type) ? data.type : "";
  data.dateDebut = !isEmpty(data.dateDebut) ? data.dateDebut : "";
  data.dateFin = !isEmpty(data.dateFin) ? data.dateFin : "";

  if (validator.isEmpty(data.type)) {
    errors.type = "Veuillez entrer votre type d'absence";
  }
  if (!validator.isDate(data.dateDebut)) {
    errors.dateDebut = "Veuillez entrer votre le date de debut d'absence ";
  }
  if (!validator.isDate(data.dateFin)) {
    errors.dateFin = "Veuillez entrer votre le date de fin d'absence ";
  }
  if (
    !validator.isEmpty(data.dateDebut) &&
    !validator.isEmpty(data.dateFin) &&
    isBefore(new Date(data.dateFin), new Date(data.dateDebut))
  ) {
    errors.dateDebut = "La date de début doit être antérieure à la date de fin";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};