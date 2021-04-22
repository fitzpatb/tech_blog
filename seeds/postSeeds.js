const { Post } = require('../models');

const postData = [
  {
    post_title: 'Make me an Avenger',
    post_text: 'I belive I could be a real asset. I have no super powers but have an encyclopedic knowledge of Marvel',
    user_id: 1
  },
  {
    post_title: 'I am Ironman',
    post_text: 'If you did not already know, I Tony Stark am Ironman. My accomplishemnts include being the only person to make Thanos bleed and I even saved New York by carring a nuke into space.',
    user_id: 2
  },
  {
    post_title: 'Should I be the new Captain America',
    post_text: 'So my friend Steve gave me his shield and wants me to take his place. I am unsure if I am right for the job. I dont neccesarily stand for the same beliefs as this country for a number of resons. Should I take the job?',
    user_id: 3
  }
];

const postSeeds = () => Post.bulkCreate(postData);

module.exports = postSeeds;