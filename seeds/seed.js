const { User } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds');
const commentSeeds = require('./commentSeeds');

const sequelize = require('../config/connection');

const seed = async() => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true,
  });

  await postSeeds();
  await commentSeeds();

  console.log('Seeds complete');
  process.exit(0);
};

seed();