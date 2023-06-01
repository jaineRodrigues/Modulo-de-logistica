const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Center = sequelize.define('centers', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    localizacao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estoque: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    entregas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {

  });

module.exports = Center;
