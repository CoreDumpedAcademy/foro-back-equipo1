const bcrypt = require('bcryptjs');

const UserSchema = require('../models/user');
const { sign } = require('../middleware/token');

const register = (req, res) => {
  const newRegister = new UserSchema({
    userName: req.body.userName,
    mail: req.body.mail,
    password: req.body.password,
    years: req.body.years,
    country: req.body.country,
  });

  const registerPayload = {
    userName: req.body.userName,
    mail: req.body.mail,
  };

  newRegister.save((err) => {
    if (err) res.status(500).send({ message: 'Error', err });
    res.status(200).send({ message: 'Done, know you are suscribed' });
    return sign(registerPayload);
  });
};

const login = (req, res) => {
  UserSchema.findOne({ userName: req.body.userName }, (err, Userlogin) => {
    // Handle errors
    if (err) return res.status(500).send({ message: 'No user searched', err });

    // eslint-disable-next-line prefer-arrow-callback
    bcrypt.compare(req.body.password, Userlogin.password, function (err1, ok) {
      if (err1) return res.status(500).send({ message: 'Error Wrong Password', err1 });
      // Equal
      if (ok) {
        const payload = {
          name: Userlogin.userName,
          mail: Userlogin.mail,
          password: Userlogin.password,
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
