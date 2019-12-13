const mongoose = require('mongoose');

const { Schema } = mongoose;

const responsePost = new Schema({
  idPost: { type: String }, // asociar con el hilo al que se ha respondido
  bodyText: { type: String, required: [true, 'Body text is required'] },
  date: { type: Date, default: Date.now() },
  userName: { type: String }, // quien ha escrito la respuesta
});

module.exports = mongoose.model('responsePostHackathonTeam', responsePost);
