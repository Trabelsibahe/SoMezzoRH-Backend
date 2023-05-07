const { query } = require('express');
const NotificationModel = require('../models/notification');
const UserModel = require('../models/user');
const multer = require('multer')
const path = require('path')




// Envoyer une notification à tous
const sendNotificationToAll = async (req, res) => {
  const notificationObj = {
    message: req.body.message,
    read: false,
  };

  try {
    const users = await UserModel.find();
    const notifications = users.map(async (user) => {
      notificationObj.user = user._id;
      const notification = new NotificationModel(notificationObj);
      return await notification.save();
    });

    const createdNotifications = await Promise.all(notifications);

    return res.status(200).json({
      message: "Les notifications ont été envoyées avec succès à tous les utilisateurs !",
      createdNotifications,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};

// Envoyer une notification à une utilisateur specifique
const sendNotificationtoOneUser = async (req, res) => {
    const { message } = req.body;
    const userId = req.params.userId;
  
    try {
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      const notificationObj = {
        user: user._id,
        message,
        read: false,
      };
  
      const notification = new NotificationModel(notificationObj);
      const createdNotification = await notification.save();
  
      return res.status(200).json({
        message: 'Votre notification a été envoyée avec succès !',
        createdNotification,
      });
    } catch (err) {
      return res.status(400).json({ errors: err.message });
    }
  };
  
// Afficher tous notification
const FindNotifications = async (req, res) => {
  try {
    const data = await NotificationModel.find({ userId: req.user._id });
    res.status(200).json(data)

  } catch (error) {
    res.status(404).json(error.message);
  }
}
// Afficher mes notification
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
  sendNotificationtoOneUser,
  sendNotificationToAll
}