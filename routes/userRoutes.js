const express = require('express');

const { register, login } = require('../controllers/userControllers');
const { validate } = require('../middleware/token');

const route = express.Router();

// La finalidad de tu función validate es controlar el acceso a los controladores por lo que se llama como un middleware
// y no tiene una ruta especifica. De querer tener una ruta para comprobar tokens hazla aparte.
// y se escribiría algo así route.post('/register', validate , register); para controlar el acceso a esa ruta. 
route.post('/register', register);
route.post('/login', login);

// Validate token
route.post('/tokenValidation', validate, (req, res) => res.status(200).send({ message: req.body.decodedToken }));

module.exports = route;
