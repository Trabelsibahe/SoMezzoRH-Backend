
const ArchiveModel = require('../models/archives')

const FindArchive = async (req ,res)=>{
    try {
       const data =  await ArchiveModel.find().populate('user', ["utilisateur", "matricule", "role"])
       res.status(200).json(data)

    } catch (error) {
        res.status(404).json(error.message)
    }
}




module.exports = {
   FindArchive
  }