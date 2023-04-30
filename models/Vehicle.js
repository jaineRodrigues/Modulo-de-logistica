//Modelo de veiculos

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Vehicle extends Model {
  constructor() {
    super();
    this.table = "veiculo";
  }
}

Vehicle.init(
  {
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    renavam: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataCompra: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dataVencimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Vehicle",
    tableName: "veiculo", 
    timestamps: false 
  }
);

module.exports = { Vehicle };