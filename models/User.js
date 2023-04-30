const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('usuarios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userType: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false // desativa as colunas createdAt e updatedAt
});


module.exports = User;
