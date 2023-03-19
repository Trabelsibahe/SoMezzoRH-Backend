const ProfileModel = require('../models/profile')
const ValidateProfile = require("../validators/Profile")
const UserModel = require('../models/user')
const ArchiveModel = require('../models/archives')



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


//fonction modifier profile
const modifierContact = async (req, res) => {
    const param = req.params.id;
    const { user, ville, tel, pays, codepostal } = req.body;
  
    try {
      const modifiedContact = await ProfileModel.findById(param).populate('user');
      if (!modifiedContact) {
        return res.status(404).json({ error: "Contact introuvable" });
      }
  
      if (user) {
        modifiedContact.user.utilisateur = user.utilisateur;
        modifiedContact.user.matricule = user.matricule;
        modifiedContact.user.role = user.role;
        await modifiedContact.user.save();
      }
  
      modifiedContact.ville = ville || modifiedContact.ville;
      modifiedContact.tel = tel || modifiedContact.tel;
      modifiedContact.pays = pays || modifiedContact.pays;
      modifiedContact.codepostal = codepostal || modifiedContact.codepostal;
  
      await modifiedContact.save();
  
      res.status(200).json({ message: "Contact modifié avec succès", data: modifiedContact });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  //fonction recherche par matricule dans profile
const searchByMatricule = async (req, res) => {
    try {
      const matricule = req.query.matricule;
      const user = await UserModel.findOne({ matricule: { $regex: new RegExp(matricule, "i") } });
      if (user) {
        const profile = await ProfileModel.findOne({ user: user.id });
        if (profile) {
          res.json({ user, profile });
        } else {
          res.status(404).send('Profil introuvable');
        }
      } else {
        res.status(404).send('Utilisateur introuvable');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  };
  //archive


module.exports = {
    modifierContact,
    searchByMatricule,
    CreateProfile,
    FindAllProfiles,
    FindSingleProfile,
    DeleteProfile
}