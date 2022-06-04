const express = require('express');
const route = express.Router();
const posts = require('../models/postmodel');
const User = require('../models/usermodel');
const path = require('path');
const uuidv4 = require('uuid/v4');

const multer = require('multer');
const DIR = './postimages';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './postimages');
  },
  filename: function(req, file, cb) {
    cb(null, uuidv4() + file.originalname.split(' ').join(''));
  }
});

const fileFilter = (req, file, cb) => {
  var ext = path.extname(file.originalname);
  if (ext === '.jpeg' || ext === '.png' || ext === '.jpg') {
    cb(null, true);
  } else {
    return cb(null, new Error('Only images are allowed'));
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5000000
  }
});
route.get('/get_by_id/:id', async (req, res) => {
  try {
    let post = await posts.findById(req.params.id);
    console.log(post);
    res.status(200).json({
      post
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error
    });
  }
});
route.get('/posts/:username', async (req, res) => {
  try {
    let allPosts = await posts.find({ user: req.params.username });
    let user = await User.findOne({ username: req.params.username });
    console.log(user);
    if (!user) {
      return res.status(200).json({
        message: 'Not Found'
      });
    }

    user.views++;
    await user.save();
    console.log(allPosts);
    allPosts = allPosts.reverse();
    let post = [];
    let mems = [];
    for (let i = 0; i < allPosts.length; ++i) {
      if (allPosts[i].image.length > 0) {
        mems.push(allPosts[i]);
      } else {
        post.push(allPosts[i]);
      }
    }
    res.status(200).json({
      allPosts: post,
      allMems: mems,
      user
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Unable to fetch all Posts!!' });
  }
});

route.post('/upload', upload.single('image'), (req, res) => {
  let imagepath = '';
  if (req.file) {
    imagepath = req.file.path;
  }
  posts.create(
    {
      content: req.body.content,
      image: imagepath,
      user: req.body.username,
      date: new Date()
    },
    (err, post) => {
      if (err) {
        return res.send({ result: false, error: err });
      } else {
        return res.send({ result: true, post: post });
      }
    }
  );
});

route.post('/hide/:id', async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    post.hidden = !post.hidden;
    await post.save();
    return res.status(200).json({
      message: 'successfully hidded'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error
    });
  }
});
route.get('/leaderboard', async (req, res) => {
  try {
    let users = await User.find().sort({ views: 1 });

    console.log(users[users.length - 1]);
    console.log(users[users.length - 2]);
    console.log(users[users.length - 3]);
    let output = [];
    output.push(users[users.length - 1]);
    output.push(users[users.length - 2]);
    output.push(users[users.length - 3]);

    return res.status(200).json({
      output: output
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error
    });
  }
});

module = module.exports = route;
