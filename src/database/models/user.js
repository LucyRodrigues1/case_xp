'use strict';
const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { timestamps: false },
  );
  return UserTable;
};

module.exports = UserSchema;