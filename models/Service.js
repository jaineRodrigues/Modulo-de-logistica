const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('services', {
  veiculo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dataServico: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, {

});

module.exports = Service;
