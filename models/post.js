const mongoose = require('mongoose');

const { Schema } = mongoose;

const postModel = new Schema({
  header: { type: String, required: [true, 'Header is required'], maxlength: 70 },
  bodyText: { type: String, required: [true, 'Body text is required'], maxlength: 5000 },
  date: { type: Date, default: Date.now() },
  // eslint-disable-next-line max-len
  userName: { type: String }, // Sirve tanto para mostrar el nombre del creador como para saber quién lo ha escrito
});

module.exports = mongoose.model('postModelHackathonTeam', postModel);
