/* eslint-disable no-console */
const jwt = require('jsonwebtoken');

const key =
  process.env.SECRET_TOKEN || 'VyXrp9R6VcbrmlpWfayqDBG1K03HShKUnxEH4tzzBYv9gzBNAY';

// generate token
const sign = (payload) => {
  jwt.sign(payload, key, (token, err) => {
    if (err) return console.log(err);
    return console.log(token);
  });
};

module.exports = {
  sign,
};
