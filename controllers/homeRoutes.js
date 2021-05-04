const router = require('express').Router();
const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");
const withAuth = require('../utils/auth');

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
    if (req.session.logged_in === true) {
      res.render('home', {
        posts,
        logged_in: true
      });
    } else {
      res.render('home', {
        posts
      });
    }

  } catch (err) {
    console.log('failure')
    res.status(500).json(err);
  }

});



router.get("/post/:id", async (req, res) => {
  if (req.session.logged_in === true) {
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
      req.session.save(() => {
        req.session.post_id = req.params.id;
      })
      const post = postData.get({ plain: true});

      res.render('post', {
        post,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.redirect('/login');
  }
});

router.get("/login", (req, res) => {
  res.render('login');
})

router.get("/logout", (req, res) => {
  res.render('logout', {
    logged_in: true
  });
})

router.get('/edit', async (req, res) => {
  res.render('edit')
})

router.get('/dashboard', withAuth, async (req, res) => {
  if (req.session.logged_in === true) {
    try {
      const postData = await Post.findAll({
        where: {
          user_id: req.session.user_id
        },
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
            attributes: ['username', "id"]
          },
          {
            model: Comment,
            as: 'comments',
            attributes: ['comment_text', "user_id", "id"]
          }
        ]
      });
      const posts = postData.map((post) => post.get({ plain: true}));
      console.log(posts);
      res.render('dashboard', {
        posts,
        logged_in: true
      });
    } catch (err) {
    res.status(500).json(err);
    }
  } else {
    res.redirect('/login');
  }

})
module.exports = router;