const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class DashboardCommentaries extends Model {}

DashboardCommentaries.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    dashboard_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'dashboard',
        key: 'id',
        unique: false
      }
    },

    commentaries_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'commentaries',
        key: 'id',
        unique: false
      }
    },


  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'dashboard_commentaries',
  }
);

module.exports = DashboardCommentaries;
