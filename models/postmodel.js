const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: String,
  image: String,
  comments: {
    type: [Object]
  },
  user: String,
  date: Date,
  hidden: {
    type: Boolean,
    default: false
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
