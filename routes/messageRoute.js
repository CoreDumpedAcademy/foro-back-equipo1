const express = require('express');
const messageController = require('../controllers/messageControllers');

const route = express.Router();

route.post('/sendMsg', messageController.createMsg);
route.post('/getReceivedMsg', messageController.getReceivedMsg);
route.post('/getSentMsg', messageController.getSentMsg);

module.exports = route;
