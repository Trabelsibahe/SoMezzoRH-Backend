const AbsenceModel = require('../models/absence')
const Validateabsence = require("../validators/absence")

// create absence
const CreateAbsence = async (req, res) => {
  const { errors, isValid } = Validateabsence(req.body);
  const absenceobj = {
    type: req.body.type,
    dateDebut: req.body.dateDebut,
    deteFin: req.body.deteFin,
    commentaire: req.body.commentaire,
    user: req.user.id
  };

  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      const absence = await AbsenceModel.findOne({ user: req.user.id });
      if (!absence) {
        absenceobj.absences = [];
        absenceobj.absences.push(await AbsenceModel.create(absenceobj)._id);
        await AbsenceModel.create(absenceobj);
        res.status(200);
        res.json({ message: "Votre absence a été créé avec succès !" });
      } else {
        if (!absence.absences) {
          absence.absences = [];
        }
        const newAbsence = await AbsenceModel.create(absenceobj);
        absence.absences.push(newAbsence._id);
        await absence.save();
        res.status(200);
        res.json({ message: "Votre absence a été créé avec succès !" });
      }
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  CreateAbsence,
}