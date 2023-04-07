const AbsenceModel = require('../models/absence')
const Validateabsence = require("../validators/absence")

// create absence
const CreateAbsence = async (req, res) => {
  const { errors, isValid } = Validateabsence(req.body);
  const absenceobj = {
    type: req.body.type,
    dateDebut: req.body.dateDebut,
    dateFin: req.body.dateFin,
    commentaire: req.body.commentaire,
    user: req.user.id
  };

  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      let absence = await AbsenceModel.findOne({ user: req.user.id });
      if (!absence) {
        absence = await AbsenceModel.create({ user: req.user.id, absences: [absenceobj] });
      } else {
        if (!absence.absences) {
          absence.absences = [absenceobj];
        } else {
          absence.absences.push(absenceobj);
        }
        await absence.save();
      }
      res.status(200);
      res.json({ message: "Votre absence a été créé avec succès !" });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};



const FindAllAbsences = async (req, res) => {
  try {
    const absences = await AbsenceModel.find({ user: req.user.id }).populate('user', ["matricule", "role","nom", "prenom"])
    res.status(200).json(absences)

  } catch (error) {
    res.status(404).json(error.message)
  }
}
module.exports = {
  FindAllAbsences,
  CreateAbsence,
}