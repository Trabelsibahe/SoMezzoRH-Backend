
const ArchiveModel = require('../models/archives')
const ProfileModel = require('../models/profile')
const FindArchive = async (req ,res)=>{
    try {
       const data =  await ArchiveModel.find().populate('user', ["utilisateur", "matricule", "role"])
       res.status(200).json(data)

    } catch (error) {
        res.status(404).json(error.message)
    }
}
//profile
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
        bio: archiveToDelete.bio,
        adresse: archiveToDelete.adresse,
        createdAt: archiveToDelete.createdAt,
        updatedAt: archiveToDelete.updatedAt,
      };
      
      // Créer un nouveau document dans la collection "Archive" avec les données à archiver
      const newProfileDoc = await ProfileModel.create(profileData);
      console.log(`Le document d'archives avec l'ID ${newProfileDoc._id} a été créé`);
      
      // Supprimer le document de la collection "Profile"
      await archiveToDelete.remove();
      console.log(`Le document avec l'ID ${id} a été supprimé de la collection "Profile"`);
      
      // Renvoyer une réponse réussie
      res.status(200).json({ message: `Le document avec l'ID ${id} a été supprimé de la collection "Profile"` });
    } catch (error) {
      console.error(`Une erreur s'est produite : ${error.message}`);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression et de l\'archivage du document.' });
    }
  }



module.exports = {
   FindArchive,
   deleteArchive
  }