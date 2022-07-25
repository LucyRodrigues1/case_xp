'use strict';
const ClientSchema = (sequelize, DataTypes) => {
  const ClientTable = sequelize.define('Client', {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    clientName: DataTypes.STRING,
    saldo: DataTypes.DECIMAL
  },
  { timestamps: false },
  );

  ClientTable.associate = (models) => {
    ClientTable.hasMany(models.ClientsStock, {as: 'ClientsStock', foreignKey: 'clientId'});
  };

  return ClientTable;
};

module.exports = ClientSchema;
