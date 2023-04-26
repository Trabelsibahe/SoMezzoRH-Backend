const { query } = require('express');
const DemandeModel = require('../models/demande');
const multer = require('multer')
const path = require('path')
const Validatedemande = require("../validators/demande")

//add demande
const ajouterDemande = (req, res) => {
    const { errors, isValid } = Validatedemande(req.body);

    const demandeObj = {
        user: req.user._id,
        type: req.body.type,
        commentaire: req.body.commentaire,
        etat: req.body.etat = "Réception",
    }
    if (!isValid) {
        res.status(404).json(errors);
      } else {
    const demande = new DemandeModel(demandeObj)

    demande.save((errors, createdDemande) => {
        if (errors) return res.status(400).json({ errors })
        if (createdDemande) {
            return res.status(200).json({message: "Votre demande a été envoyer avec succès !" , createdDemande })
        }
    })
}}
  
//  Upload Image Controller
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploadsattestation')
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
  }).single('attestation')

  // afficher tous les demande
const FindAllDemande = async (req, res) => {
    try {
      const data = await DemandeModel.find().populate('user', ["matricule", "role","nom", "prenom","operation"])
      res.status(200).json(data)
  
    } catch (error) {
      res.status(404).json(error.message)
    }
  }
  const modifierDemande = async (req, res) => {
    const demandeId = req.params.id;
    const etat = req.body.etat;
    try {
      const demande = await DemandeModel.findById(demandeId);
      if (!demande) {
        res.status(404).json({ message: "La demande spécifiée n'existe pas" });
      } else {
        // Mettre à jour l'état de la demande
        demande.etat = etat;
        await demande.save();
        res.status(200).json({ message: "La demande a été modifiée avec succès", demande });
      }
    } catch (error) {
      res.status(500).json({ message: "Une erreur est survenue lors de la modification de la demande", error });
    }
  };
  
   // afficher une seul absence par ID
const FindDemande = async (req, res) => {
    try {
      const demande = await DemandeModel.find({ user: req.user.id }).populate('user', ["matricule", "role","nom", "prenom"])
      res.status(200).json(demande)
  
    } catch (error) {
      res.status(404).json(error.message)
    }
  }
  const ajouterimage = async (req, res) => {
    const demandeId = req.params.id;
    const attestation = req.file; // le fichier d'attestation à partir de la requête multipart
    try {
      const demande = await DemandeModel.findById(demandeId);
      if (!demande) {
        res.status(404).json({ message: "La demande spécifiée n'existe pas" });
      } else {
        if (attestation) {
          demande.attestation = attestation.path; // sauvegarder le chemin d'accès du fichier
        }
        await demande.save();
        res.status(200).json({ message: "La demande a été modifiée avec succès", demande });
      }
    } catch (error) {
      res.status(500).json({ message: "Une erreur est survenue lors de la modification de la demande", error });
    }
  };
  
module.exports = {
    ajouterimage,
    FindDemande,
    modifierDemande,
    FindAllDemande,
    upload,
    ajouterDemande,
}