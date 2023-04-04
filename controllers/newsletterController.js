const { query } = require('express');
const NewsletterModel = require('../Models/newsletter');
const multer = require('multer')
const path = require('path')

//add newsletters
const ajouternews = (req, res) => {
    const newsObj = {
        titre: req.body.titre,
        description: req.body.description,
        imgurl: req.file.path,// on utilise req.file pour récupérer l'image uploadée
    }
    const newsletter = new NewsletterModel(newsObj)
    //insert data in database
    newsletter.save((error, createdNews) => {
        if (error) return res.status(400).json({ error })
        if (createdNews) {
            return res.status(200).json({ createdNews })
        }
    })
}

//fonction lister des news 
const listerNews = async (req ,res)=>{
    try {
        const data =  await NewsletterModel.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

//  Upload Image Controller
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('imgurl')

//delete newsletters
const Deletenews = async (req ,res)=>{
    try {
        const data =  await NewsletterModel.findOneAndRemove({_id: req.params.id})
        res.status(200).json({message: "ce news a été supprimé avec succès."})
 
     } catch (error) {
         res.status(404).json(error.message)
     }
}

module.exports = {
    Deletenews,
    upload,
    listerNews,
    ajouternews,
}