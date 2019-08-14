module.exports = function(sequelize, DataTypes) {
  var WishList = sequelize.define("WishList", {
    store_id: DataTypes.TEXT,
    name: DataTypes.STRING,
    color: DataTypes.TEXT,
    size: DataTypes.TEXT,
    rating: DataTypes.TEXT,
    description: DataTypes.TEXT
  },{
    freezeTableName: true
  });
  return WishList;
};          
