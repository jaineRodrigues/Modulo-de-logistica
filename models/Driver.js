//Modelo de  condutores

const db = require('../config/database');
const { DataTypes } = require('sequelize');

const Driver = db.define('condutores', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    cnh : {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    validade: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false // desativa as colunas createdAt e updatedAt
});


module.exports = Driver;