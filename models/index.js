const User = require('./User');
const Dashboard = require('./Dashboard');
const Commentaries = require('./Commentaries');
const DashboardCommentaries = require('./DashboardCommentaries');

User.hasMany(Dashboard, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Dashboard.belongsTo(User, {
  foreignKey: 'user_id'
});


User.hasMany(Commentaries, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Commentaries.belongsTo(User, {
  foreignKey: 'user_id'
});

// Commentaries belongToMany Dashboard (through DashboardCommentaries)
Commentaries.belongsToMany(Dashboard, {
  // Define the third table needed to store the foreign keys
  through: {
    model: DashboardCommentaries,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'dashboard_commentaries'
});

// Dashboard belongToMany Commentaries (through DashboardCommentaries)
Dashboard.belongsToMany(Commentaries, {
  // Define the third table needed to store the foreign keys
  through: {
    model: DashboardCommentaries,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'commentaries_dashboard'
});


module.exports = { User, Dashboard, Commentaries, DashboardCommentaries };
