//Modelo de veiculos

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vehicle = sequelize.define('veiculo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    renavam: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataCompra: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dataVencimento: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false // desativa as colunas createdAt e updatedAt
});


module.exports = Vehicle;