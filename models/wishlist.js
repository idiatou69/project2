module.exports = function(sequelize, DataTypes) {
  var WishList = sequelize.define("WishList", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  
  return WishList;
};          
