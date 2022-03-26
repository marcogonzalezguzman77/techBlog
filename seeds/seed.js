const sequelize = require('../config/connection');
const { User, Dashboard, Commentaries, DashboardCommentaries } = require('../models');

const userData = require('./userData.json');
const dashboardData = require('./dashboardData.json');
const commentariesData = require('./commentariesData.json');
const dashboardcomentariesData = require('./dashboardcomentariesData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
 
  //For Users table
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  //For Dashboard table
  for (const dashboard of dashboardData) {
    await Dashboard.create({
      ...dashboard,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  //For Commentaries table
  for (const commentaries of commentariesData) {
    await Commentaries.create({
      ...commentaries,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  
  //For dashboard_commentaries table
  for (const dashboardcommentaries of dashboardcomentariesData) {
    await DashboardCommentaries.create({
      ...dashboardcommentaries
    });
  }


  process.exit(0);
};

seedDatabase();
