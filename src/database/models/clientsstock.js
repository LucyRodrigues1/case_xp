'use strict';
const ClientsStockSchema = (sequelize, DataTypes) => {
  const ClientsStockTable = sequelize.define('ClientsStock', {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    stockId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    totalRate: DataTypes.DECIMAL,
    clientId: DataTypes.INTEGER
  },
  { timestamps: false },
  );

  ClientsStockTable.associate = (models) => {
    ClientsStockTable.belongsTo(models.Client, {as: 'Client', foreignKey: 'clientId'});
  };

  ClientsStockTable.associate = (models) => {
    ClientsStockTable.belongsTo(models.Stock, {as: 'Stock', foreignKey: 'stockId'});
  };

  return ClientsStockTable;
};

module.exports = ClientsStockSchema;