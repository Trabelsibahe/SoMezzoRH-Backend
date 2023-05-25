const { query } = require('express');
const ArchiverdvdvModel = require('../models/archiverdv');
const FindArchiverdv = async (req, res) => {
    try {
      const data = await ArchiverdvdvModel.find().populate('user', ["matricule", "role","nom", "prenom","operation"])
      res.status(200).json(data)
  
    } catch (error) {
      res.status(404).json(error.message)
    }
  }
  module.exports = {
    FindArchiverdv
  }