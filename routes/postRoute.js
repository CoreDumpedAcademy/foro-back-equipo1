const express = require('express');
const controller = require('../controllers/postControllers');

const route = express.Router();

route.post('/create', controller.create);
route.get('/get', controller.getAll);
route.delete('/delete', controller.deletePost);

module.exports = route;
