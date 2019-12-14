const express = require('express');
const controller = require('../controllers/postControllers');

const route = express.Router();

route.post('/create', controller.create);
route.get('/get', controller.getPosts);
route.post('/searchByUsername', controller.getPostByUserName);
route.post('/searchByHeader', controller.getPostByHeader);

module.exports = route;
