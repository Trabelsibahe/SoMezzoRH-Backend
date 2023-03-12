const ProfileModel = require('../models/profile')
const ValidateProfile = require("../validators/Profile")



// create profile
const CreateProfile = async (req ,res)=>{
    const {errors, isValid} = ValidateProfile(req.body)
    try {
        if(!isValid){
          res.status(404).json(errors)
        }else{
            ProfileModel.findOne({user: req.user.id})
        .then(async (profile)=>{
            if(!profile){
                req.body.user = req.user.id
                await ProfileModel.create(req.body)
                res.status(200).json({message: "Votre profil a été créé avec succès !"})
            }else{
               await  ProfileModel.findOneAndUpdate(
                    {_id: profile._id},
                    req.body,
                    {new: true}
                ).then(result=>{
                    res.status(200).json(result)
                })
            }
        })
        }
    } catch (error) {
         res.status(404).json(error.message)
    }
}


//
const FindAllProfiles = async (req ,res)=>{
    try {
       const data =  await ProfileModel.find().populate('user', ["utilisateur", "matricule", "role"])
       res.status(200).json(data)

    } catch (error) {
        res.status(404).json(error.message)
    }
}

const FindSingleProfile = async (req ,res)=>{
    try {
        const data =  await ProfileModel.findOne({user: req.user.id}).populate('user', ["utilisateur", "matricule", "role"])
        res.status(200).json(data)
 
     } catch (error) {
         res.status(404).json(error.message)
     }
}

const DeleteProfile = async (req ,res)=>{
    try {
        const data =  await ProfileModel.findOneAndRemove({_id: req.params.id})
        res.status(200).json({message: "ce compte a été supprimé avec succès."})
 
     } catch (error) {
         res.status(404).json(error.message)
     }
}

module.exports = {
    CreateProfile,
    FindAllProfiles,
    FindSingleProfile,
    DeleteProfile
}