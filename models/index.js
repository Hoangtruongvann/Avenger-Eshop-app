const Sequelize = require("sequelize");
const initModels = require("./init-models");
console.log(process.env);
const sequelize = new Sequelize("avenger", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = {
  sequelize: sequelize,
  models: initModels(sequelize),
};
