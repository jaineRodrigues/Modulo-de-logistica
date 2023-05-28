const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transportadora = sequelize.define('Transportadora', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    razao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logradouro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    }, {
    timestamps: false // desativa as colunas createdAt e updatedAt
  });

module.exports = Transportadora;