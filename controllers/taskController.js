const { query } = require('express');
const TaskModel = require('../models/task');
const ValidateTask = require("../validators/task")


//add newsletters
const ajouterTask = (req, res) => {
    const { errors, isValid } = ValidateTask(req.body);

    const taskObj = {
        titre: req.body.titre,
        description: req.body.description,
        dateCreation: new Date(req.body.dateCreation),
        dateSuppression: new Date(req.body.dateSuppression),
        priorite: req.body.priorite,
    }
    if (!isValid) {
        res.status(404).json(errors);
      } else {
    const task = new TaskModel(taskObj)

    task.save((errors, createdTask) => {
        if (errors) return res.status(400).json({ errors })
        if (createdTask) {
            return res.status(200).json({message: "Votre task a été créé avec succès !" , createdTask })
        }
    })
}}
const listerTask = async (req ,res)=>{
    try {
        const data =  await TaskModel.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)
    }
}
module.exports = {
    ajouterTask,
    listerTask
}