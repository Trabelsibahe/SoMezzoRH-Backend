const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ValidatePasswordChange = require("../validators/PasswordChange");
const ProfileModel = require('../models/profile');
const UserModel = require("../models/user");
const AbsenceModel = require("../models/absence");
const ChallengesModel = require("../models/Challenges");
const ValidateChallenge = require("../validators/Challenges")


// Lister les employés ayant la même opération que moi (seulement pour L'RRH)

const ListerOperation = async (req, res) => {

    try {
        const CurrentUser = await UserModel.findById(req.user.id);
        const ProfileList = await ProfileModel.find().populate('user', ["matricule", "role", "nom", "prenom", "operation", "titre", "active"]);
        const UserList = await UserModel.find({
            operation: CurrentUser.operation
        });
        const matchedProfiles = [];


        for (let i = 0; i < ProfileList.length; i++) {
            for (let j = 0; j < UserList.length; j++) {
                if (ProfileList[i].user.equals(UserList[j]._id)) {
                    matchedProfiles.push(ProfileList[i]);
                }
            }
        }

        res.status(200).json(matchedProfiles);

    } catch (error) {
        res.status(404).json(error.message)
    }
}

// lister les absences seulement du employés (role = EMP) ayant la meme operation que moi
const ListerabsenceOperation = async (req, res) => {

    try {
        const CurrentUser = await UserModel.findById(req.user.id);
        const AbsenceList = await AbsenceModel.find().populate('user', ["matricule", "role", "nom", "prenom", "operation", "titre", "active"]);
        const UserList = await UserModel.find({
            operation: CurrentUser.operation,
            role: "EMP"
        });
        const matchedAbsence = [];
        for (let i = 0; i < AbsenceList.length; i++) {
            for (let j = 0; j < UserList.length; j++) {
                if (AbsenceList[i].user.equals(UserList[j]._id)) {
                    matchedAbsence.push(AbsenceList[i]);
                }
            }
        }
        
        res.status(200).json(matchedAbsence);

    } catch (error) {
        res.status(404).json(error.message)
    }
}

// lister les absences avec etat = "En attente" ((fonction hedhi jdida hotha fel les demandes dabsences)) // not being used
const ListerabsenceOperation2 = async (req, res) => {

    try {
        const CurrentUser = await UserModel.findById(req.user.id);
        const AbsenceList = await AbsenceModel.find().populate('user', ["matricule", "role", "nom", "prenom", "operation", "titre", "active"]);

        const UserList = await UserModel.find({
            operation: CurrentUser.operation
        });
        const matchedAbsence = [];
        const EnAttentes = [];

        for (let i = 0; i < AbsenceList.length; i++) {
            for (let j = 0; j < UserList.length; j++) {
                if (AbsenceList[i].user.equals(UserList[j]._id)) {
                    matchedAbsence.push(AbsenceList[i]);

                    if (matchedAbsence[i].absences[i].etat === "En attente") {
                        EnAttentes.push(matchedAbsence[i]);
                    }
                }
            }
        }
        res.status(200).json(EnAttentes);

    } catch (error) {
        res.status(404).json(error.message)
    }
}


const ListerChallengesOperation = async (req, res) => {

    try {
        const CurrentUser = await UserModel.findById(req.user.id);
        const ChallengeList = await ChallengesModel.find().populate('user', ["operation"]);
        const UserList = await UserModel.find({
            operation: CurrentUser.operation
        });
        const matchedChallenge = [];

        for (let i = 0; i < ChallengeList.length; i++) {
            for (let j = 0; j < UserList.length; j++) {
                if (ChallengeList[i].user && ChallengeList[i].user.equals(UserList[j]._id)) {
                    matchedChallenge.push(ChallengeList[i]);
                }
            }
        }

        res.status(200).json(matchedChallenge);

    } catch (error) {
        res.status(404).json(error.message)
    }
}

const addChallengeOperation = async (req, res) => {
    const { errors, isValid } = ValidateChallenge(req.body);
    if (!isValid) {
        res.status(404).json(errors);
      } else {
    try {
      const CurrentUser = await UserModel.findById(req.user.id);
      const ChallengeList = await ChallengesModel.find().populate("user", [
        "matricule",
        "role",
        "nom",
        "prenom",
        "operation",
        "titre",
        "active",
      ]);
      const UserList = await UserModel.find({
        operation: CurrentUser.operation,
      });
  
      // Ajouter une nouvelle tâche
      if (req.method === "POST") {
        const { titre, description, dateCreation, dateSuppression, priorite } = req.body;
  
        const newChallenges = new ChallengesModel({
          titre,
          description,
          dateCreation: new Date(dateCreation),
          dateSuppression: new Date(dateSuppression),
          priorite,
          user: req.user.id,
        });
  
        const createdChallenges = await newChallenges.save();
        return res.status(200).json({
          message: "Votre tâche a été créée avec succès !",
          Challenges: createdChallenges,
        });
      }
  
      // Récupérer la liste des tâches pour l'utilisateur connecté
      const matchedChallenges = ChallengeList.filter((Challenges) =>
      Challenges.user && Challenges.user.operation === CurrentUser.operation
      );
  
      res.status(200).json(matchedChallenges);
    } catch (error) {
      res.status(404).json(error.message);
    }
  }};
  
module.exports = {
    addChallengeOperation,
    ListerChallengesOperation,
    ListerOperation,
    ListerabsenceOperation,
    ListerabsenceOperation2,

};

/* other method: 
const ListerOperation = async (req, res) => {
    try {
        const CurrentUser = await UserModel.findById(req.user.id);

        const matchedProfiles = await ProfileModel.aggregate([
            {
                $lookup: {
                    from: "users", // Collection name of UserModel
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $match: {
                    "user.operation": CurrentUser.operation
                }
            }
        ]);

        res.status(200).json(matchedProfiles);

    } catch (error) {
        res.status(404).json(error.message);
    }
};
 */