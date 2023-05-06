const { query } = require('express');
const NotificationModel = require('../models/notification');
const multer = require('multer')
const path = require('path')


// Afficher mes notification
const FindNotifications = async (req, res) => {
  try {
    const data = await NotificationModel.find({ userId: req.user._id });
    res.status(200).json(data)

  } catch (error) {
    res.status(404).json(error.message)
  }
}

// Ajouter une notification
const createNotification = async (req, res) => {

  const notificationObj = {
    user: req.user._id,
    message: req.body.message,
    read: false,
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
  const getNotificationsByUserId = async (req, res) => {
    try {
      const notifications = await NotificationModel.find({ user: req.user.id })
      res.status(200).json(notifications)
  
    } catch (error) {
      res.status(404).json(error.message)
    }
  }
module.exports = {
  getNotificationsByUserId,
  FindNotifications,
  createNotification,
}