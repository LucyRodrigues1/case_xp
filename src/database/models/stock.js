'use strict';
const StockSchema = (sequelize, DataTypes) => {
  const StockTable = sequelize.define('Stock', {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    code: DataTypes.STRING,
    companyName: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    amount: DataTypes.INTEGER,
  },
  { timestamps: false },
  );

  StockTable.associate = (models) => {
    StockTable.hasMany(models.ClientsStock, {as: 'ClientsStock', foreignKey: 'stockId'});
  };

  return StockTable;
};

module.exports = StockSchema;