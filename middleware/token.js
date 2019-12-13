/* eslint-disable no-console */
require('../config/config');

const jwt = require('jsonwebtoken');
require('../config/config');

// generate token
const sign = (payload) => {
  // eslint-disable-next-line max-len
  jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN }, (token, err) => {
    if (err) return console.log(err);
    return console.log(`${token}\n`);
  });
};

// validate token
const validate = (req, res, next) => {
  // eslint-disable-next-line consistent-return
  jwt.verify(req.body.token, process.env.SECRET_TOKEN, (jwtErr, decodedToken) => {
    if (jwtErr) return res.status(401).send({ message: 'Error', jwtErr });
    req.body.decodedToken = decodedToken;
    next(); // next function
  });
};

module.exports = {
  sign,
  validate,
};
