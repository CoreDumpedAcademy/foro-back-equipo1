const express = require('express');
const controllers = require('../controllers/responseControllers');

const route = express.Router();

route.post('/createRes', controllers.createResponse);

module.exports = route;
