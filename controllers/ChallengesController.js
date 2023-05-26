const { query } = require('express');
const ChallengeModel = require('../models/Challenges');
const ValidateChallenge = require("../validators/Challenges")
const UserModel = require('../models/user');


//add Challenge
const ajouterChallenge = (req, res) => {
    const { errors, isValid } = ValidateChallenge(req.body);

    const ChallengesObj = {
        user: req.user._id,
        titre: req.body.titre,
        description: req.body.description,
        dateCreation: new Date(req.body.dateCreation),
        dateSuppression: new Date(req.body.dateSuppression),
        priorite: req.body.priorite,
        prime: req.body.prime,
    }
    if (!isValid) {
        res.status(404).json(errors);
    } else {
        const Challenge = new ChallengeModel(ChallengesObj)

        Challenge.save((errors, createdChallenge) => {
            if (errors) return res.status(400).json({ errors })
            if (createdChallenge) {
                return res.status(200).json({ message: "Votre Challenge a été créé avec succès !", createdChallenge })
            }
        })
    }
}

// lister tous les challenge pour l'Expert RH
const listerChallenge = async (req, res) => {
    try {
        const ChallengeList = await ChallengeModel.find()
            .populate("user", ["matricule", "operation"])
            .populate("participantsIds.user", ["matricule", "nom", "prenom"]);
        res.status(200).json(ChallengeList);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

// modifier le challenge / Validation & Prime
const updateChallenge = async (req, res) => {
    try {
      const participantsData = req.body.participants;
  
      const challengeId = req.params.challengeId;
  
      const challenge = await ChallengeModel.findById(challengeId);
  
      if (!challenge) {
        return res.status(404).json({ message: "Challenge non trouvé" });
      }
  
      Object.keys(participantsData).forEach(async (key) => {
        const { userId, valide } = participantsData[key];
        const participantIndex = challenge.participantsIds.findIndex(
          (participant) => participant.user.toString() === userId
        );
        if (participantIndex !== -1) {
          challenge.participantsIds[participantIndex].valide = valide;
        }
      });
  
      await challenge.save();
  
      res.status(200).json({
        message: "Participants du challenge mis à jour avec succès",
        participantsData,
      });
    } catch (error) {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la mise à jour des participants du challenge.",
        error: error.message,
      });
    }
  };
  
  
  
  
  
// supprimer le challenge
const supprimerChallenge = (req, res) => {
    const dateActuelle = new Date();
    const dateSuppression = new Date(dateActuelle.getTime() - 23 * 60 * 60 * 1000); // soustraire 24 heures
    ChallengeModel.find({ dateSuppression: { $lt: dateSuppression } }, (err, Challenges) => {
        if (err) {
            console.error(err);
            if (res) {
                return res.status(500).json({ error: 'Erreur serveur' });
            }
        } else {
            Challenges.forEach((item) => {
                item.remove();
            });
            if (res) {
                return res.status(200).json({ message: `Challenges supprimées : ${Challenges.length}` });
            }
        }
    });
};

setInterval(supprimerChallenge, 60 * 60 * 1000);
//counter les challenge
const countChallenge = async (req, res) => {
    try {
        const count = await ChallengeModel.countDocuments();
        res.status(200).json({ count });

    } catch (error) {
        res.status(404).json(error.message);
    }
};
const updateTotal = async (req, res) => {
    try {
      const participantsData = req.body.participants;
      const challengeId = req.params.challengeId;
      const challenge = await ChallengeModel.findById(challengeId);
  
      if (!challenge) {
        return res.status(404).json({ message: "Challenge non trouvé" });
      }
  
      Object.keys(participantsData).forEach(async (key) => {
        const { userId, valide } = participantsData[key];
        const participantIndex = challenge.participantsIds.findIndex(
          (participant) => participant.user.toString() === userId
        );
        if (participantIndex !== -1) {
          challenge.participantsIds[participantIndex].valide = valide;
          if (valide) {
            const participant = challenge.participantsIds[participantIndex];
            participant.total = participant.participations * challenge.prime;
          } else {
            const participant = challenge.participantsIds[participantIndex];
            participant.total = 0;
          }
        }
      });
  
      await challenge.save();
  
      res.status(200).json({
        message: "Participants du challenge mis à jour avec succès",
        participantsData,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la mise à jour des participants du challenge.",
        error: error.message,
      });
    }
  };

  
  
  
  
  
module.exports = {
    updateTotal,
    countChallenge,
    supprimerChallenge,
    ajouterChallenge,
    listerChallenge,
    updateChallenge
}