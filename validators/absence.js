const isEmpty = require("./isEmpty");
const validator = require("validator");
const { isBefore, isAfter } = require("date-fns");

const currentDate = new Date();
const oneYearFromNow = new Date();
oneYearFromNow.setFullYear(currentDate.getFullYear() + 1);




module.exports = function ValidateAbsence(data,file) {
  let errors = {};

  data.type = !isEmpty(data.type) ? data.type : "";
  data.dateDebut = !isEmpty(data.dateDebut) ? data.dateDebut : "";
  data.dateFin = !isEmpty(data.dateFin) ? data.dateFin : "";


  if (validator.isEmpty(data.type)) {
    errors.type = "Veuillez entrer le type d'absence.";
  }
  if (!validator.isDate(data.dateDebut)) {
    errors.dateDebut = "Veuillez entrer la date de debut de période d'absence.";
  }
  if (!validator.isDate(data.dateFin)) {
    errors.dateFin = "Veuillez entrer la date de fin de période d'absence.";
  }

  // Check for past date in dateDebut
 /* if (!validator.isEmpty(data.dateDebut) && isBefore(new Date(data.dateDebut), new Date())) {
    errors.dateDebut = "La date de début d'absence ne peut pas être une date passée.";
  }

  // Check for past date in dateFin
  if (!validator.isEmpty(data.dateFin) && isBefore(new Date(data.dateFin), new Date())) {
    errors.dateFin = "La date de fin d'absence ne peut pas être une date passée.";
  }

  // Check for future date over one year in dateDebut
  if (!validator.isEmpty(data.dateDebut) && isAfter(new Date(data.dateDebut), oneYearFromNow)) {
    errors.dateDebut = "La date de début d'absence ne doit pas dépasser un an à partir de la date actuelle.";
  }

  // Check for future date over one year in dateFin
  if (!validator.isEmpty(data.dateFin) && isAfter(new Date(data.dateFin), oneYearFromNow)) {
    errors.dateFin = "La date de fin d'absence ne doit pas dépasser un an à partir de la date actuelle.";
  }

  if (
    !validator.isEmpty(data.dateDebut) &&
    !validator.isEmpty(data.dateFin) &&
    isBefore(new Date(data.dateFin), new Date(data.dateDebut))
  ) {
    errors.dateDebut = "La date de début d'absence doit être antérieure à la date de fin d'absence.";
  }*/

  return {
    errors,
    isValid: isEmpty(errors),
  };
};