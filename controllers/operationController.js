const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ValidatePasswordChange = require("../validators/PasswordChange");
const ProfileModel = require('../models/profile');
const UserModel = require("../models/user");



// Lister les employés ayant la même opération que moi (seulement pour L'RRH)

const ListerOperation = async (req, res) => {

    try {
        const CurrentUser = await UserModel.findById(req.user.id);
        const ProfileList = await ProfileModel.find().populate('user', ["matricule", "role","nom", "prenom", "operation","titre", "active"]);
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


module.exports = {
    ListerOperation
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