const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserActivity = sequelize.define('user_activity', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
}, {
  tableName: 'user_activity',
  timestamps: false,
});

module.exports = UserActivity;
