const express = require('express');
const route = express.Router();
const posts = require('../models/postmodel');

route.post('/upload', async (req, res) => {
  //   posts.updateOne(
  //     { _id: req.body.id },
  //     { $set: { comments: req.body.comments } },
  //     (err, result) => {
  //       if (err) {
  //         // console.log(err);
  //         return res.send({ result: false, error: err });
  //       } else {
  //         return res.send({ result: true });
  //       }
  //     }
  //   );
  try {
    const post = await posts.findById(req.body.id);
    post.comments.push({
      comment1: {
        content: req.body.comment.content,
        date: Date.now()
      }
    });
    await post.save();
    return res.status(200).json({
      message: 'successfully added comment'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error
    });
  }
});

module = module.exports = route;
