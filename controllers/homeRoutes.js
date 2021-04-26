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

router.get("/dashboard", async (req, res) => {
  if (req.session.logged_in === true) {
    try {
      const userData = await User.findOne({
        where: { id: req.session.id},
        include: [{
          model: Post,
          as: 'post',
          attributes: [
            'id',
            'post_title',
            'post_text',
            'created_at'
          ]
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['comment_text', "user_id", "id"]
        }]
      });
      const userPosts = userData.get({ plain: true});
      res.status(200).json(userPosts);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.redirect('login');
  }
})

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

router.get("/login", (req, res) => {
  res.render('login');
})

module.exports = router;