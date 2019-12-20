const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const UserSchema = require('../models/user');
const { sign } = require('../middleware/token');

const register = (req, res) => {

  const newRegister = new UserSchema({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    birhtdate: req.body.birthdate,
    country: req.body.country,
  });

  const registerPayload = {
    username: req.body.username,
    email: req.body.email,
  };

  newRegister.save((err) => {
    if (err) res.status(500).send({ message: 'Error', err });
  });

  const token = jwt.sign({
    registerPayload
  }, process.env.SECRET_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN })

  return res.status(200).json({registerPayload, token})
  
};

const login = (req, res) => {
  UserSchema.find({ userName: req.body.username }, (err, Userlogin) => {
    // Handle errors
    if (Userlogin.length === 0) return res.status(404).send({ message: 'No user applied' });
    if (err) return res.status(500).send({ message: 'No user searched', err });

    // eslint-disable-next-line prefer-arrow-callback
    bcrypt.compare(req.body.password, Userlogin[0].password, function (err1, ok) {
      if (err1) return res.status(500).send({ message: 'Error Wrong Password', err1 });
      // Equal
      if (ok) {
        const payload = {
          name: Userlogin[0].username,
          mail: Userlogin[0].email,
        };
        return sign(payload);
      }
    });
    return res.status(200).send({ message: 'You have login' });
  });
};

module.exports = {
  register,
  login,
};
