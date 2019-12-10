const express = require('express');
const controller = require('../controllers/postControllers');

const route = express.Router();

route.post('/create', controller.create);

module.exports = route;
