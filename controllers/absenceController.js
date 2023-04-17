const { query } = require('express');
const AbsenceModel = require('../models/absence')
const Validateabsence = require("../validators/absence")
const userModel = require('../models/user')
const multer = require('multer')
const path = require('path')


// create absence
const CreateAbsence = async (req, res) => {
  const { errors, isValid } = Validateabsence(req.body);
  const default_justif= {
    fieldname: 'justif',
  }
  const absenceobj = {
    type: req.body.type,
    dateDebut: req.body.dateDebut,
    dateFin: req.body.dateFin,
    commentaire: req.body.commentaire,
    etat: req.body.etat = "En attente" ,
    justif: req.file ? req.file.path : default_justif.path,         // assigner l'emplacement de l'image à la propriété image
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

// afficher tous les absences
const FindAllAbsences = async (req, res) => {
  try {
    const data = await AbsenceModel.find().populate('user', ["matricule", "role","nom", "prenom","operation"])
    res.status(200).json(data)

  } catch (error) {
    res.status(404).json(error.message)
  }
}

 // afficher une seul absence par ID
const FindAbsences = async (req, res) => {
  try {
    const absences = await AbsenceModel.find({ user: req.user.id }).populate('user', ["matricule", "role","nom", "prenom"])
    res.status(200).json(absences)

  } catch (error) {
    res.status(404).json(error.message)
  }
}

//  Upload Image Controller
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploadsjustif')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
          return cb(null, true)
      }
      cb('Give proper files formate to upload')
  }
}).single('justif')


const modifierAbsence = async (req, res) => {
  const { id } = req.params;
  const {  etat } = req.body;

  try {
    const absence = await AbsenceModel.findOne({ "absences._id": id });
    if (!absence) {
      return res.status(404).json({ message: "Absence introuvable" });
    }

    const absenceIndex = absence.absences.findIndex(
      (absence) => absence._id.toString() === id
    );

    absence.absences[absenceIndex].etat = etat;

    await absence.save();

    res.status(200).json({ message: "Absence modifiée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  modifierAbsence,
  upload,
  FindAllAbsences,
  FindAbsences,
  CreateAbsence,
}