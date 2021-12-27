var DataTypes = require("sequelize").DataTypes;
var _brands = require("./brands");
var _categories = require("./categories");
var _detailcarts = require("./detailcarts");
var _detailorders = require("./detailorders");
var _images = require("./images");
var _orders = require("./orders");
var _products = require("./products");
var _reviews = require("./reviews");
var _shipcoms = require("./shipcoms");
var _shops = require("./shops");
var _users = require("./users");

function initModels(sequelize) {
  var brands = _brands(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var detailcarts = _detailcarts(sequelize, DataTypes);
  var detailorders = _detailorders(sequelize, DataTypes);
  var images = _images(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var shipcoms = _shipcoms(sequelize, DataTypes);
  var shops = _shops(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  orders.belongsToMany(products, { as: 'product_id_products_detailorders', through: detailorders, foreignKey: "order_id", otherKey: "product_id" });
  products.belongsToMany(orders, { as: 'order_id_orders', through: detailorders, foreignKey: "product_id", otherKey: "order_id" });
  products.belongsToMany(users, { as: 'user_id_users', through: detailcarts, foreignKey: "product_id", otherKey: "user_id" });
  users.belongsToMany(products, { as: 'product_id_products', through: detailcarts, foreignKey: "user_id", otherKey: "product_id" });
  products.belongsTo(brands, { as: "brand", foreignKey: "brand_id"});
  brands.hasMany(products, { as: "products", foreignKey: "brand_id"});
  categories.belongsTo(categories, { as: "parent_category_category", foreignKey: "parent_category"});
  categories.hasMany(categories, { as: "categories", foreignKey: "parent_category"});
  products.belongsTo(categories, { as: "category", foreignKey: "category_id"});
  categories.hasMany(products, { as: "products", foreignKey: "category_id"});
  detailorders.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(detailorders, { as: "detailorders", foreignKey: "order_id"});
  detailcarts.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(detailcarts, { as: "detailcarts", foreignKey: "product_id"});
  detailorders.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(detailorders, { as: "detailorders", foreignKey: "product_id"});
  images.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(images, { as: "images", foreignKey: "product_id"});
  reviews.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(reviews, { as: "reviews", foreignKey: "product_id"});
  orders.belongsTo(shipcoms, { as: "shipp_com", foreignKey: "shipp_com_id"});
  shipcoms.hasMany(orders, { as: "orders", foreignKey: "shipp_com_id"});
  users.belongsTo(shipcoms, { as: "user_ship_com", foreignKey: "user_ship_com_id"});
  shipcoms.hasMany(users, { as: "users", foreignKey: "user_ship_com_id"});
  orders.belongsTo(shops, { as: "shop", foreignKey: "shop_id"});
  shops.hasMany(orders, { as: "orders", foreignKey: "shop_id"});
  users.belongsTo(shops, { as: "user_shop_shop", foreignKey: "user_shop"});
  shops.hasMany(users, { as: "users", foreignKey: "user_shop"});
  detailcarts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(detailcarts, { as: "detailcarts", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  reviews.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(reviews, { as: "reviews", foreignKey: "user_id"});

  return {
    brands,
    categories,
    detailcarts,
    detailorders,
    images,
    orders,
    products,
    reviews,
    shipcoms,
    shops,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
