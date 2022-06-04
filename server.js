const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const DB = process.env.database.replace('<password>', process.env.DB_PASSWORD);
const mongoose = require('mongoose');

//Add DB here for connection to official account
const test = DB;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() =>
    console.log('DB Connection Successful \n+-+-+-+-+-+-+-+-+-+-+-+-')
  )
  .catch(err => {
    console.log(err);
  });

app.use('/postimages', express.static('postimages'));

app.use(
  cors({
    credentials: true,
    origin: function(origin, callback) {
      callback(null, true);
    }
  })
);

app.get('/test', (req, res) => {
  res.send('working');
});

app.use('/user', require('./middlewares/userroutes'));

app.use('/post', require('./middlewares/postroutes'));

app.use('/comment', require('./middlewares/commentsroutes'));

app.use(express.static('my-app/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'my-app', 'build', 'index.html'));
});

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log('Server started on https://unnown.social');
});
