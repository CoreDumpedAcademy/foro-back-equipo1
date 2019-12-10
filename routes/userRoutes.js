const express = require('express');

const { register, login } = require('../controllers/userControllers');
const { validate } = require('../middleware/token');

const route = express.Router();

route.post('/register', register);
route.post('/login', login);

// Validate token
route.post('/tokenValidation', validate, (req, res) => res.status(200).send({ message: req.body.decodedToken }));

module.exports = route;
