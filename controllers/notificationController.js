const { query } = require('express');
const NotificationModel = require('../models/notification');
const UserModel = require('../models/user');
const multer = require('multer')
const path = require('path');
const notification = require('../models/notification');




// Envoyer une notification à tous
const sendNotificationToAll = async (req, res) => {
  const { message, journal } = req.body;

  try {
    const users = await UserModel.find();

    const notifications = users.map(async (user) => {
      const notification = await NotificationModel.findOne({ user: user._id });

      if (!notification) {

        const newNotification = new NotificationModel({
          user: user._id,
          notifications: [{ message, journal, creationDate: Date.now(), read: false }],
        });
        return await newNotification.save();
      } else {

        notification.notifications.push({message, journal, creationDate: Date.now(), read: false});
        return await notification.save();
      }
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
  const { message, journal } = req.body;
  const userId = req.params.userId;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const notificationObj = {
      message,
      journal,
      creationDate: Date.now(),
      read: false,
    };

    let notification = await NotificationModel.findOne({ user: user._id });

    if (!notification) {
      notification = new NotificationModel({
        user: user._id,
        notifications: [notificationObj],
      });
    } else {
      notification.notifications.push(notificationObj);
    }

    const createdNotification = await notification.save();

    return res.status(200).json({
      message: 'Votre notification a été envoyée avec succès !',
      createdNotification,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};


// Afficher tous les notification (expert)
const FindNotifications = async (req, res) => {
  try {
    const data = await NotificationModel.find({ userId: req.user._id }).populate('user', ["matricule", "role", "nom", "prenom", "operation", "titre", "active"]);
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


// Marquer la notification comme lu
const SetNotificationRead = async (req, res) => {
  const notificationId = req.params.notificationId;

  try {
    const notification = await NotificationModel.find({ user: req.user.id });
<<<<<<< HEAD
  
=======

>>>>>>> 81499321d523860aa8b55048aa936695337c1713
    if (!notification) {
      return res.status(404).json({ message: "Notification non trouvée" });
    }

    notification[0].notifications.forEach(item => {
      if (notificationId === item.id) {
        item.read = true;
        notification[0].save();
      }
    });

    return res.status(200).json({
      message: "La notification a été mise à jour avec succès",
      notification,
    });
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};


module.exports = {
  SetNotificationRead,
  getNotificationsByUserId,
  FindNotifications,
  sendNotificationtoOneUser,
  sendNotificationToAll
}