/* eslint-disable no-console */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const newRegisterSchema = new Schema({
  username: { type: String, unique: true, required: [true, 'Username required'] },
  email: { type: String, unique: true, required: [true, 'Mail required'] },
  password: { type: String, required: [true, 'Password required'] },
  birthdate: { type: Date },
  country: { type: String },
  dateOfRegister: { type: Date, default: Date.now() },
});

newRegisterSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) console.log(err);
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model('RegisterHackatonTeam', newRegisterSchema);
