module.exports = function(sequelize, DataTypes) {
  var ProductList = sequelize.define("Product", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return ProductList;
};