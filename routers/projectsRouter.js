const express = require('express');
const projectsRouter = express.Router();
const projectsMethods = require('../data/helpers/projectModel.js');
const actionsMethods = require('../data/helpers/actionModel.js');

// get,
//   insert,
//   update,
//   remove,
//   getProjectActions,

projectsRouter.get('/',(req,res) => {
    projectsMethods.get()
    .then(project => {
       if(project){
           res.status(200).json(project)
       } else {
           res.status(404).json({message: "No projects found"})
       }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'Error occurred'})
    })
})

projectsRouter.get('/:id', (req,res) => {
    projectsMethods.get(req.params.id)
    .then(data => {
        res.status(200).json(data)
    })
    //add 404 if have time 
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

projectsRouter.get('/:id/actions', (req,res) => {
    projectsMethods.getProjectActions(req.params.id)
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})



projectsRouter.post('/', (req,res) => {
    const projectData = req.body;
    if(!projectData.name || !projectData.description){
        res.status(400).json({ error: "Please provide name and description" })
    } else {
        projectsMethods.insert(projectData)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
    }
});

//TODO: delete, put, postaction, middleware

projectsRouter.delete('/:id', (req,res) => {
    projectsMethods.remove(req.params.id)
    .then(response => {
        res.status(200).json({message : 'Project has been deleted'})
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

projectsRouter.put('/:id', (req,res) => {
    projectsMethods.update(req.params.id, req.body)
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

projectsRouter.post('/:id/actions', validatePost, (req,res) => {
    req.body.project_id = req.project
    if (!req.body.notes || !req.body.description) {
        res.status(400).json({error: "Add descriptoion and notes"})
    } else { 
        actionsMethods.insert(req.body)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).json({ error: err.message})
        })
    }
})



function validatePost(req, res, next) {
    projectsMethods.get(req.params.id)
    .then(data => {
        if (data) {
            req.body.project_id = data.project_id
            req.project = req.params.id
            next();
        } else {
            res.status(400).json({error: "Cant find project"})
        }
    })
}


module.exports = projectsRouter;