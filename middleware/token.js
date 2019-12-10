/* eslint-disable no-console */
const jwt = require('jsonwebtoken');

// generate token
const sign = (payload) => {
  jwt.sign(payload, process.env.SECRET_TOKEN, (token, err) => {
    if (err) return console.log(err);
    return console.log(token);
  });
};

module.exports = {
  sign,
};
