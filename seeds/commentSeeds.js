const { Comment } = require('../models');

const commentData = [
  {
    comment_text: 'Sorry kid we are not hiring.',
    user_id: 2,
    post_id: 1
  },
  {
    comment_text: 'Do you ever stop thinking about yourself?',
    user_id: 3,
    post_id: 2
  },
  {
    comment_text: 'Steve chose you for a reason pick up the shield.',
    user_id: 1,
    post_id: 3
  }
];

const commentSeeds = () => Comment.bulkCreate(commentData);

module.exports = commentSeeds;