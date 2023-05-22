const { query } = require('express');
const ChallengeModel = require('../models/Challenges');
const ValidateChallenge = require("../validators/Challenges")


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
    }
    if (!isValid) {
        res.status(404).json(errors);
      } else {
    const Challenge = new ChallengeModel(ChallengesObj)

    Challenge.save((errors, createdChallenge) => {
        if (errors) return res.status(400).json({ errors })
        if (createdChallenge) {
            return res.status(200).json({message: "Votre Challenge a été créé avec succès !" , createdChallenge })
        }
    })
}}

// lister tous les challenge pour l'Expert RH
const listerChallenge = async (req, res) => {
    try {
        const ChallengeList = await ChallengeModel.find()
            .populate("user", ["matricule","operation"])
            .populate("participantsIds.user", ["matricule", "nom", "prenom"]);
        res.status(200).json(ChallengeList);
    } catch (error) {
        res.status(404).json(error.message);
    }
}
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


module.exports = {
    supprimerChallenge,
    ajouterChallenge,
    listerChallenge
}