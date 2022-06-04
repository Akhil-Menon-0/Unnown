const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  username: {
    type: String
  }
});

const Freeze = mongoose.model('Freeze', postSchema);

module.exports = Freeze;
