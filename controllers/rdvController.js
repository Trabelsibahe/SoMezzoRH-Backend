const { query } = require('express');
const RdvModel = require('../models/rdv');

//ajouter date de rdv avec medcin
const ajouterdate = (req, res) => {
  const { date } = req.body;

  const rdvObj = {
    user: req.user._id,
    date: new Date(req.body.date), 
 };

  const dateRDV = new RdvModel(rdvObj);

  dateRDV.save((error, createddate) => {
    if (error) {
      return res.status(400).json({ errors: error });
    }
    if (createddate) {
      return res
        .status(200)
        .json({ message: "Vous avez ajouté une date", createddate });
    }
  });
};
//afficher le date de rdv avec medcin 
const afficherdv = async (req, res) => {
    try {
      const rdv = await RdvModel.findOne();
      if (rdv) {
        const date = rdv.date;
        res.status(200).json(date);
      } else {
        res.status(404).json("Aucun rendez-vous trouvé");
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
  
  //ajouter une demande de rdv avec medcin 
  const ajouterdemande = (req, res) => {
    const demandeObj = {
      user: req.user._id,
      maladie: req.body.maladie,
      commentaire: req.body.commentaire,
      etat: "en attente",
      date: req.body.date, // Utilisation de la date fournie dans la requête
    };
  
    const demandeRDV = new RdvModel(demandeObj);
  
    demandeRDV.save((error, createddemande) => {
      if (error) {
        return res.status(400).json({ errors: error });
      }
      if (createddemande) {
        return res
          .status(200)
          .json({ message: "Vous avez ajouté une demande de rdv", createddemande });
      }
    });
  };
  
  //recupere mes rdv
  const MesRDV = async (req, res) => {
    try {
      const data = await RdvModel.find({ user: req.user.id }).populate('user', ["matricule","nom", "prenom"])
      res.status(200).json(data)
  
    } catch (error) {
      res.status(404).json(error.message)
    }
  }
  //modifier etat si accepter ne depasse pas 5 utilisateur 
  const etatrdv = async (req, res) => {
    const rdvId = req.params.id;
    const etat = req.body.etat;
  
    try {
      const rdv = await RdvModel.findById(rdvId);
  
      if (!rdv) {
        res.status(404).json({ message: "Le rdv spécifié n'existe pas" });
      } else {
        const acceptedUsersCount = await RdvModel.countDocuments({ etat: "accepté" });
  
        if (acceptedUsersCount >= 5) {
          res.status(403).json({ message: "Le nombre maximum d'utilisateurs acceptés a été atteint" });
        } else {
          rdv.etat = etat;
          await rdv.save();
          res.status(200).json({ message: "La demande a été modifiée avec succès", rdv });
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Une erreur est survenue lors de la modification de la rdv", error });
    }
  };
  // afficher tous les absences
const afficherdemande = async (req, res) => {
    try {
      const data = await RdvModel.find().populate('user', ["matricule", "role","nom", "prenom"])
      res.status(200).json(data)
  
    } catch (error) {
      res.status(404).json(error.message)
    }
  }
module.exports = {
    afficherdemande,
    etatrdv,
    MesRDV,
    afficherdv,
    ajouterdate,
    ajouterdemande,
  }