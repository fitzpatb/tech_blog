const router = require('express').Router();
const sequelize = require('../../config/connection.js');
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
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
      console.log(posts);
      res.render('dashboard', {
        posts
      });
    } catch (err) {
    res.status(500).json(err);
    }
  } else {
    alert("you must login first")
  }

})

module.exports = router;