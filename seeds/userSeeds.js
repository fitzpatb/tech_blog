const { User } = require('../models');

const userData = [
  {
    username: 'fitzpatb',
    email: 'bfitzpatrick28@gmail.com',
    password: 'Steelwatt90!'
  },
  {
    username: 'ironman',
    email: 'stark3000@gmail.com',
    password: 'avengers'
  },
  {
    username: 'falcon',
    email: 'onyourleft@gmail.com',
    password: 'captain'
  }
];

const userSeeds = () => User.bulkCreate(userData);

module.exports = userSeeds;