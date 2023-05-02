const { query } = require('express');
const NotificationModel = require('../models/notification');
const multer = require('multer')
const path = require('path')

//ajouter une notification
const ajouternotification = async (req, res) => {
    const notificationObj = {
      user: req.user._id,
      message: req.body.message,
      lire: req.body.lire,
    };
  
    try {
      const notification = new NotificationModel(notificationObj);
      const createdNotification = await notification.save();
  
      return res
        .status(200)
        .json({
          message: "Votre notification a été envoyée avec succès !",
          createdNotification,
        });
    } catch (err) {
      return res.status(400).json({ errors: err.message });
    }
  };
  // afficher tous les notification
const FindAllNotification = async (req, res) => {
    try {
      const data = await NotificationModel.find().populate('user', ["matricule", "role","nom", "prenom","operation"])
      res.status(200).json(data)
  
    } catch (error) {
      res.status(404).json(error.message)
    }
  }
  module.exports = {
    ajouternotification,
    FindAllNotification
  }