const mongoose = require('mongoose');

const userSchema1 = new mongoose.Schema({
  name: String,
  email: String,
  profilePicture: String,
  resume: String,
});

module.exports = mongoose.model('User1', userSchema1);
