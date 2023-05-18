
const ArchiveModel = require('../models/archives')
const ProfileModel = require('../models/profile')


//get all archives 
const FindArchive = async (req ,res)=>{
    try {
       const data =  await ArchiveModel.find().populate('user', ["nom", "prenom","matricule", "role", "operation","titre", "active"])
       res.status(200).json(data)

    } catch (error) {
        res.status(404).json(error.message)
    }
}
//delete archive to profile
const deleteArchive = async (req, res) => {
    const id = req.params.id;
    try {
      // Trouver le document à supprimer dans la collection "Profile"
      const archiveToDelete = await ArchiveModel.findById(id);
      if (!archiveToDelete) {
        throw new Error(`Aucun document avec l'ID ${id} trouvé dans la collection "archive"`);
      }
      
      // Copier les données à archiver dans un nouvel objet
      const profileData = {
        user: archiveToDelete.user,
        tel: archiveToDelete.tel,
        ville: archiveToDelete.ville,
        pays: archiveToDelete.pays,
        codepostal: archiveToDelete.codepostal,
        email: archiveToDelete.email,
        datenaiss: archiveToDelete.datenaiss,
        gouvernorat: archiveToDelete.gouvernorat,
        avatar:archiveToDelete.avatar,
        adresse: archiveToDelete.adresse,
        createdAt: archiveToDelete.createdAt,
        updatedAt: archiveToDelete.updatedAt,
      };
      
      // Créer un nouveau document dans la collection "Archive" avec les données à archiver
      const newProfileDoc = await ProfileModel.create(profileData);
      
      // Supprimer le document de la collection "Profile"
      await archiveToDelete.remove();
      
      // Renvoyer une réponse réussie
      res.status(200).json({ message: `Le document avec l'ID ${id} a été supprimé de la collection "Profile"` });
    } catch (error) {
      console.error(`Une erreur s'est produite : ${error.message}`);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression et de l\'archivage du document.' });
    }
  }
//counter les archives
const countArchives = async (req, res) => {
  try {
    const count = await ArchiveModel.countDocuments();
    res.status(200).json({ count });

  } catch (error) {
    res.status(404).json(error.message);
  }
};
const modifierArchiveById = async (req, res) => {
  const param = req.params.id;
  const { user, ville, tel, pays, codepostal } = req.body;

  try {
    const modifierArchive = await ArchiveModel.findById(param).populate('user');
    if (!modifierArchive) {
      return res.status(404).json({ error: "Profile introuvable" });
    }

    if (user) {
      modifierArchive.user.nom = user.nom;
      modifierArchive.user.prenom = user.prenom;
      modifierArchive.user.matricule = user.matricule;
      modifierArchive.user.role = user.role;
      modifierArchive.user.operation = user.operation;
      modifierArchive.user.titre = user.titre;
      modifierArchive.user.active = user.active;
      await modifierArchive.user.save();
    }

    modifierArchive.ville = ville || modifierArchive.ville;
    modifierArchive.tel = tel || modifierArchive.tel;
    modifierArchive.pays = pays || modifierArchive.pays;
    modifierArchive.codepostal = codepostal || modifierArchive.codepostal;

    await modifierArchive.save();

    res.status(200).json({ message: "Profile modifié avec succès", data: modifierArchive });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  modifierArchiveById,
  countArchives,
   FindArchive,
   deleteArchive
  }