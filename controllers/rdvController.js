const { query } = require('express');
const RdvModel = require('../models/rdv');
const ArchiverdvModel = require('../models/archiverdv');
//ajouter date de rdv avec medecin
const ajouterdate = async (req, res) => {
  const rdvObj = {
    user: req.user._id,
    date: new Date(req.body.date),
    capacite: req.body.capacite
  };
  try {
    const ExDate = await RdvModel.findOne({ user: req.user._id });
    if (ExDate) {
      ExDate.date = rdvObj.date;
      ExDate.capacite = rdvObj.capacite;
      const updatedRdv = await ExDate.save();
      return res.status(200).json({ message: "La date de visite médicale a été mise à jour.", updatedRdv });
    } 
      else {
      const NewDate = new RdvModel(rdvObj);
      const createdRdv = await NewDate.save();
      return res.status(200).json({ message: "Vous avez ajouté une date de visite médicale.", createdRdv });
    }
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
}


//afficher le date de rdv avec medcin 
const afficherdv = async (req, res) => {
    try {
      const rdv = await RdvModel.findOne();
      if (rdv) {
        const info ={
           date : rdv.date,
           capacite : rdv.capacite,
        }
      
        res.status(200).json(info);
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
    const motif = req.body.motif;
    try {
      const rdv = await RdvModel.findById(rdvId);
  
      if (!rdv) {
        res.status(404).json({ message: "Le rdv spécifié n'existe pas" });
      } else {
        const data = await RdvModel.find().populate('user', ["matricule", "role", "nom", "prenom"]);
        const expertData = data.filter(item => item.user.role === "EXPERT");
        const capacites = expertData.map(item => item.capacite);
        const capacite = capacites.reduce((total, capacite) => {
          if (typeof capacite === 'number' && !isNaN(capacite)) {
            return total + capacite;
          }
          return total;
        }, 0);
        const acceptedUsersCount = await RdvModel.countDocuments({ etat: "accepté" });
        if (acceptedUsersCount >= capacite && etat === "accepté") {
          res.status(403).json({ message: "Le nombre maximum d'utilisateurs acceptés a été atteint" });
          return;
        }
  
        rdv.etat = etat;
        rdv.motif = motif;
  
        await rdv.save();
        res.status(200).json({ message: "La demande a été modifiée avec succès", rdv });
      }
    } catch (error) {
      res.status(500).json({ message: "Une erreur est survenue lors de la modification de la rdv", error });
    }
  };
  
  const archiverRdv = async (req, res) => {
    try {
      const today = new Date();
      const rdvsToDelete = await RdvModel.find({ date: { $lt: today.getTime() - 23 * 60 * 60 * 1000 } });
  
      if (rdvsToDelete.length === 0) {
        const response = {
          message: "Aucun profil à archiver."
        };
        return res.json(response);
      }
  
      const archivedRdvs = [];
  
      for (const rdv of rdvsToDelete) {
        const archivedRdv = new ArchiverdvModel(rdv.toObject());
        await archivedRdv.save();
        archivedRdvs.push(archivedRdv);
        await RdvModel.findByIdAndRemove(rdv._id);
      }
  
      const response = {
        message: `${archivedRdvs.length} profils ont été archivés avec succès.`
      };
      return res.json(response);
    } catch (error) {
      const response = {
        error: "Une erreur s'est produite lors du déplacement et de l'archivage des profils.",
        details: error.message
      };
      return res.status(500).json(response);
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
  archiverRdv,
    afficherdemande,
    etatrdv,
    MesRDV,
    afficherdv,
    ajouterdate,
    ajouterdemande,
  }