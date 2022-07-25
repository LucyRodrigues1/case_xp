require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "database_xp",
    host: process.env.DB_HOST || "db",
    dialect: process.env.DB_DIALECT || "mysql",
    port: process.env.MYSQL_PORT || '3306',
    logging: process.env.DEBUG !== 'false',
    dialectOptions: {
      timezone: 'Z',
    },
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "database_xp",
    host: process.env.DB_HOST || "db",
    dialect: process.env.DB_DIALECT || "mysql",
    port: process.env.MYSQL_PORT || '3306',
    logging: process.env.DEBUG !== 'false',
    dialectOptions: {
      timezone: 'Z',
    },
  },
  "production": {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "database_xp",
    host: process.env.DB_HOST || "db",
    dialect: process.env.DB_DIALECT || "mysql",
    port: process.env.MYSQL_PORT || '3306',
    logging: process.env.DEBUG !== 'false',
    dialectOptions: {
      timezone: 'Z',
    },
  }
}