const { query } = require('express');
const SanteModel = require('../models/sante');
const ValidatedemandeRdv = require("../validators/sante")

//add demande de RDV
const ajouterdemandeRdv = (req, res) => {
  const { errors, isValid } = ValidatedemandeRdv(req.body);

  const santeObj = {
    user: req.user._id,
    commentaire: req.body.commentaire,
    etat: req.body.etat = "en attente",
  }
  if (!isValid) {
    res.status(404).json(errors);
  } else {
    const demandeRDV = new SanteModel(santeObj)

    demandeRDV.save((errors, createdDemandeRdv) => {
      if (errors) return res.status(400).json({ errors })
      if (createdDemandeRdv) {
        return res.status(200).json({ message: "Votre demande RDV a été envoyer avec succès !", createdDemandeRdv })
      }
    })
  }
}
const FindAllDemandeRdv = async (req, res) => {
    try {
      const data = await SanteModel.find().populate('user', ["matricule"])
      res.status(200).json(data)
  
    } catch (error) {
      res.status(404).json(error.message)
    }
  }
//modifier l'etat et donnez une rdv
  const modifierDemandeRdv = async (req, res) => {
    const santeId = req.params.id;
    const etat = req.body.etat;
    const rdv = req.body.rdv
    try {
      const demanderdv = await SanteModel.findById(santeId);
      if (!demanderdv) {
        res.status(404).json({ message: "La demande RDV spécifiée n'existe pas" });
      } else {
        // Mettre à jour l'état et le date de la demande rdv
        demanderdv.etat = etat;
        demanderdv.rdv = rdv;
        await demanderdv.save();
        res.status(200).json({ message: "La demande RDV a été modifiée avec succès", demanderdv });
      }
    } catch (error) {
      res.status(500).json({ message: "Une erreur est survenue lors de la modification de la demande", error });
    }
  };
  // afficher une seul demande de RDV 
const FindDemandeRDV = async (req, res) => {
    try {
      const demanderdv = await SanteModel.find({ user: req.user.id }).populate('user', ["matricule", "role", "nom", "prenom"])
      res.status(200).json(demanderdv)
  
    } catch (error) {
      res.status(404).json(error.message)
    }
  }
module.exports = {
    FindDemandeRDV,
    modifierDemandeRdv,
    FindAllDemandeRdv,
    ajouterdemandeRdv,
  }