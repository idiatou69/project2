module.exports = function(sequelize, DataTypes) {
    var stores = sequelize.define("store", {
      name: {
          type: DataTypes.STRING,
          allowNull:false,
          validate: {
            len: [1]
  
          }

      } 
      

  
    });
  
    
  
    return stores;
  };
 