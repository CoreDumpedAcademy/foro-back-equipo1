const mongoose = require('mongoose');

const { Schema } = mongoose;

const postModel = new Schema({
  header: { type: String, required: [true, 'Header is required'], maxlength: 70 },
  body: { type: String, required: [true, 'Body text is required'] },
  date: { type: Date, default: Date.now() },
  userName: { type: String },
});

module.exports = mongoose.model('postModelHackathonTeam', postModel);
