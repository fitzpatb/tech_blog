const router = require('express').Router();
const sequelize = require('../../config/connection.js');
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/post', async (req, res) => {
  try {
    const newPost = await Post.create({
      post_title: req.body.post_title,
      post_text: req.body.post_content,
      user_id: req.session.user_id
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.get('/post', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/comment', async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_text: req.body.comment,
      user_id: req.session.user_id,
      post_id: req.session.post_id
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.put('/update', async (req, res) => {
  try {
    const updatePost = await Post.update(req.body, {
      where: {
        id: req.body.id
      }
    });
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.delete('/delete', async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.body.id
      }
    });
    res.status(200).json(deletePost);
  } catch (err) {
    res.status(400).json(err);
  }
})

module.exports = router;