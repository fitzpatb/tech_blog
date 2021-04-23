const router = require('express').Router();
const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: [
        'id',
        'post_title',
        'post_text',
        'created_at'
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username']
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['comment_text', "user_id", "id"]
        }
      ]
    });
    const posts = postData.map((post) => post.get({ plain: true}));
    res.render('home', {
      posts
    });
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: [
        'id',
        'post_title',
        'post_text',
        'created_at'
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username']
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['comment_text', "user_id", "id", "created_at"],
          include: {
            model: User,
            as: 'user',
            attributes: ["username"]
          }
        }
      ]
    });
    const post = postData.get({ plain: true});

    res.render('post', {
      post
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;