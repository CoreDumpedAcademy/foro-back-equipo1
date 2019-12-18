const express = require('express');
const messageController = require('../controllers/messageControllers');

const route = express.Router();

route.post('/sendMsg', messageController.createMsg);
route.post('/getRecievedMsg', messageController.getRecievedMsg);
route.post('/getSentMsg', messageController.getSentMsg);

module.exports = route;
