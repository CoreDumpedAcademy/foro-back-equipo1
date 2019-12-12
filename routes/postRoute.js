const express = require('express');
const controller = require('../controllers/postControllers');

const route = express.Router();

route.post('/create', controller.create);
route.get('/get', controller.getAll);

module.exports = route;
