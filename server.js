const express = require('express')
const projectsRouter = require('./routers/projectsRouter.js');
const actionsRouter = require('./routers/actionsRouter.js');
const server = express();
server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);



module.exports = server;