const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Travel = sequelize.define('travels', {
  departureDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  expectedArrivalDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  actualArrivalDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  driver: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamps: false // desativa as colunas createdAt e updatedAt
});

module.exports = Travel;
