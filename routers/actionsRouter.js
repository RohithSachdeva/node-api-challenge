const express = require("express");
const actionsRouter = express.Router();
const actionsMethods = require('../data/helpers/actionModel.js');

// get,
// insert,
// update,
// remove,


actionsRouter.get('/', (req,res) => {
    actionsMethods.get()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json({error: err.message })
    })
});

actionsRouter.get(':/id', (req,res) => {
    actionsMethods.get(req.params.id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
});

actionsRouter.delete('/:id', (req,res) => {
    actionsMethods.remove(req.params.id)
    .then(response => {
        res.status(200).json({message: 'Action has been deleted'})
    })
    .catch( err => {
        res.status(500).json({error: err.message})
    })
})

actionsRouter.put('/:id', (req,res) => {
    newInfo = req.body;
    actionsMethods.update(req.params.id, newInfo)
    .then(response => {
        res.status(200).json({response})
    })
    .catch( err => {
        res.status(500).json({error: err.message})
    })
})


module.exports = actionsRouter;