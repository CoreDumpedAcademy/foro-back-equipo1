const express = require('express');
const messageController = require('../controllers/messageControllers');

const route = express.Router();

route.post('/sendMsg', messageController.createMsg);
route.get('/getReceivedMsg:messages', messageController.getReceivedMsg);
route.get('/getSentMsg:author&receiver', messageController.getSentMsg);

module.exports = route;
