const ProfileModel = require('../models/profile')
const ValidateProfile = require("../validators/Profile")
const UserModel = require('../models/user')
const ArchiveModel = require('../models/archives')
const multer = require('multer')
const path = require('path')



// create profile
const CreateProfile = async (req, res) => {
  const { errors, isValid } = ValidateProfile(req.body);

  const default_avatar = {
    fieldname: 'avatar',
    originalname: 'avatar.avif',
    encoding: '7bit',
    mimetype: 'image/avif',
    destination: 'uploadsavatar/',
    filename: 'f4c6b34ace7b6c6bdd9287df1da07941',
    path: 'uploadsavatar\\f4c6b34ace7b6c6bdd9287df1da07941',
    size: 7920
  }

  const profileObj = {
    tel: req.body.tel,
    email: req.body.email,
    datenaiss: req.body.datenaiss,
    gouvernorat: req.body.gouvernorat,
    ville: req.body.ville,
    pays: req.body.pays,
    codepostal: req.body.codepostal,
    adresse: req.body.adresse,
    avatar: req.file ? req.file.path : default_avatar.path,         // assigner l'emplacement de l'image à la propriété image
    user: req.user.id
  };

  
  try {
    
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      ProfileModel.findOne({ user: req.user.id }).then(async (profile) => {
        if (!profile) {
          req.body.user = req.user.id;
          await ProfileModel.create(profileObj);
          res.status(200);
          res.json({ message: "Votre profil a été créé avec succès !" });
        } else {
          await ProfileModel.findOneAndUpdate(
            { _id: profile._id },
            profileObj, // mettre à jour la propriété image avec l'emplacement de l'image
            { new: true }
          ).then((result) => {
            res.status(200).json(result);
          });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);

  }
};
//toute la liste des employes
const FindAllProfiles = async (req, res) => {
  try {
    const data = await ProfileModel.find().populate('user', ["matricule", "role","nom", "prenom", "operation","titre", "active"])
    res.status(200).json(data)

  } catch (error) {
    res.status(404).json(error.message)
  }
}

// single profile
const FindSingleProfile = async (req, res) => {
  try {
    const data = await ProfileModel.findOne({ user: req.user.id }).populate('user', ["matricule", "role","nom", "prenom", "operation","titre", "active"])
    res.status(200).json(data)

  } catch (error) {
    res.status(404).json(error.message)
  }
}
//fonction modifier profile (CRUD)
const modifierProfileById = async (req, res) => {
  const param = req.params.id;
  const { user, tel, email, datenaiss, pays, gouvernorat, ville, codepostal, adresse } = req.body;

  try {
    const modifierProfile = await ProfileModel.findById(param).populate('user');
    if (!modifierProfile) {
      return res.status(404).json({ error: "Profile introuvable" });
    }

    if (user) {
      modifierProfile.user.nom = user.nom;
      modifierProfile.user.prenom = user.prenom;
      modifierProfile.user.matricule = user.matricule;
      modifierProfile.user.role = user.role;
      modifierProfile.user.operation = user.operation;
      modifierProfile.user.titre = user.titre;
      modifierProfile.user.active = user.active;
      await modifierProfile.user.save();
    }

    modifierProfile.ville = ville || modifierProfile.ville;
    modifierProfile.tel = tel || modifierProfile.tel;
    modifierProfile.pays = pays || modifierProfile.pays;
    modifierProfile.codepostal = codepostal || modifierProfile.codepostal;
    modifierProfile.email = email || modifierProfile.email;
    modifierProfile.gouvernorat = gouvernorat || modifierProfile.gouvernorat;
    modifierProfile.datenaiss = datenaiss || modifierProfile.datenaiss;
    modifierProfile.adresse = adresse || modifierProfile.adresse;

    await modifierProfile.save();

    res.status(200).json({ message: "Profile modifié avec succès", data: modifierProfile });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//archive
const deleteAndArchiveProfile = async (req, res) => {
  const id = req.params.id;
  try {
    // Trouver le document à supprimer dans la collection "Profile"
    const profileToDelete = await ProfileModel.findById(id);
    if (!profileToDelete) {
      throw new Error(`Aucun document avec l'ID ${id} trouvé dans la collection "Profile"`);
    }

    // Copier les données à archiver dans un nouvel objet
    const archiveData = {
      user: profileToDelete.user,
      tel: profileToDelete.tel,
      ville: profileToDelete.ville,
      pays: profileToDelete.pays,
      codepostal: profileToDelete.codepostal,
      adresse: profileToDelete.adresse,
      email: profileToDelete.email,
      avatar:profileToDelete.avatar,
      datenaiss: profileToDelete.datenaiss,
      gouvernorat: profileToDelete.gouvernorat,
      createdAt: profileToDelete.createdAt,
      updatedAt: profileToDelete.updatedAt,
    };

    // Créer un nouveau document dans la collection "Archive" avec les données à archiver
    const newArchiveDoc = await ArchiveModel.create(archiveData);
    console.log(`Le document d'archives avec l'ID ${newArchiveDoc._id} a été créé`);

    // Supprimer le document de la collection "Profile"
    await profileToDelete.remove();
    console.log(`Le document avec l'ID ${id} a été supprimé de la collection "Profile"`);

    // Renvoyer une réponse réussie
    res.status(200).json({ message: `Le document avec l'ID ${id} a été supprimé de la collection "Profile"` });
  } catch (error) {
    console.error(`Une erreur s'est produite : ${error.message}`);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression et de l\'archivage du document.' });
  }
}

//fonction modifier profile connecter 
const modifierprofile = async (req, res) => {
  const { user, ville, tel, pays, codepostal , adresse , email , datenaiss , gouvernorat} = req.body;

  try {
    const modifiedProfile = await ProfileModel.findOne({ user: req.user.id }).populate('user');
    if (!modifiedProfile) {
      return res.status(404).json({ error: "Profile introuvable" });
    }

    if (user) {
      modifiedProfile.user.nom = user.nom;
      modifiedProfile.user.prenom = user.prenom;
      modifiedProfile.user.matricule = user.matricule;
      modifiedProfile.user.role = user.role;
      modifiedProfile.user.operation = user.operation;
      modifiedProfile.user.titre = user.titre;
      modifiedProfile.user.active = user.active;
      await modifiedProfile.user.save();
    }
    modifiedProfile.adresse = adresse || modifiedProfile.adresse;
    modifiedProfile.email = email || modifiedProfile.email;
    modifiedProfile.datenaiss = datenaiss || modifiedProfile.datenaiss;
    modifiedProfile.gouvernorat = gouvernorat || modifiedProfile.gouvernorat;
    modifiedProfile.ville = ville || modifiedProfile.ville;
    modifiedProfile.tel = tel || modifiedProfile.tel;
    modifiedProfile.pays = pays || modifiedProfile.pays;
    modifiedProfile.codepostal = codepostal || modifiedProfile.codepostal;
    if (req.file) {
      modifiedProfile.avatar = req.file.path;
    }
    await modifiedProfile.save();

    res.status(200).json({ message: "Profile modifié avec succès", data: modifiedProfile });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//  Upload Image Controller
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadsavatar')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|avif/
    const mimeType = fileTypes.test(file.mimetype)
    const extname = fileTypes.test(path.extname(file.originalname))

    if (mimeType && extname) {
      return cb(null, true)
    }
    else {
      cb(null, false);
    }
    cb('Give proper files formate to upload')
  }
}).single('avatar')

//counter les profiles
const countProfiles = async (req, res) => {
  try {
    const count = await ProfileModel.countDocuments();
    res.status(200).json({ count });

  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  countProfiles,
  upload,
  modifierprofile,
  deleteAndArchiveProfile,
  modifierProfileById,
  CreateProfile,
  FindAllProfiles,
  FindSingleProfile,}