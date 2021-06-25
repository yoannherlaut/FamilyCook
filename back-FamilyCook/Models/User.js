const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  firstName: String,
  email: String,
  password: String,
});

module.exports = mongoose.model('users', userSchema);
