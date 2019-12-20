const express = require('express');

const { register, login, allUsers } = require('../controllers/userControllers');
const { validate } = require('../middleware/token');

const route = express.Router();

route.post('/register', register);
route.post('/login', login);
route.get('/allUsers', allUsers);

// ROUTE VALIDATE TOKEN
route.post('/tokenValidation', validate, (req, res) => res.status(200)/* .send({ message: req.body.decodedToken }) */);

module.exports = route;
