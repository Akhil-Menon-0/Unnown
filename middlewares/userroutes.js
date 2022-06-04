const express = require('express');
const route = express.Router();

const users = require('../models/usermodel');
const posts = require('../models/postmodel');
const Freeze = require('../models/FreezeModel');

const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('../passport');

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

route.use(cookieParser('keyboard cat'));
route.use(
  session({
    secret: 'somesecretstring',
    cookie: { maxage: 10000000, secure: false }
  })
);
route.use(flash());
route.use(passport.initialize());
route.use(passport.session());

route.post('/edit', upload.single('image'), async (req, res) => {
  try {
    const user = await users.findById(req.body.id);
    user.image = req.file.path;
    await user.save();
    return res.status(200).json({
      user,
      message: 'updated successfully'
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      error
    });
  }
});

route.get('/get_logged_in_user', (req, res) => {
  ///////////////to get logged user if any,make an empty request on this
  if (req.user) {
    console.log('true');
    res.status(200).json({ result: true, user: req.user });
  } else {
    console.log('no record');
    res.status(500).json({ result: false, user: 'no such record' });
  }
});

route.post(
  '/signup',
  passport.authenticate('signup', {
    successRedirect: '/user/redirect',
    failureRedirect: '/user/fail',
    failureFlash: true
  })
);

route.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/user/redirect',
    failureRedirect: '/user/fail',
    failureFlash: true
  })
);

route.get('/redirect', (req, res) => {
  return res.send({
    result: true,
    user: req.user,
    message: req.flash('message')[0]
  });
});

route.get('/fail', (req, res) => {
  return res.send({ result: false, message: req.flash('message')[0] });
});

route.get('/logout', (req, res) => {
  req.logOut();
  return res.send({ result: true, message: 'Logged Out' });
});

route.get('/:username', (req, res) => {
  users.findOne(
    { username: req.params.username },
    { password: 0 },
    (err, user) => {
      if (err) {
        return res.send({ result: false, error: err });
      } else if (!user) {
        return res.send({ result: false, error: 'User does not exist' });
      } else {
        user.views++;
        users.updateOne(
          { username: req.params.username },
          { $set: { views: user.views } },
          (err, result) => {
            if (err) {
              return res.send({ result: false, error: err });
            } else {
              posts.find({ user: req.params.username }, (err, result) => {
                if (err) {
                  return res.send({ result: false, error: err });
                } else {
                  return res.send({ user: user, posts: result });
                }
              });
            }
          }
        );
      }
    }
  );
});
route.post('/freeze', async (req, res) => {
  try {
    let output = new Freeze({
      username: req.body.username
    });
    await output.save();
    return res.status(200).json({
      message: 'user freezed'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error
    });
  }
});
route.post('/unfreeze', async (req, res) => {
  try {
    let output = await Freeze.findOneAndRemove({ username: req.body.username });
    return res.status(200).json({
      message: 'user unfreezed'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error
    });
  }
});
route.post('/checkfreeze', async (req, res) => {
  try {
    const freeze = await Freeze.find({ username: req.body.username });
    console.log('freeze');
    console.log(freeze);

    if (freeze.length !== 0) {
      return res.status(200).json({
        freeze: true
      });
    } else {
      return res.status(200).json({
        freeze: false
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error
    });
  }
});

module = module.exports = route;
