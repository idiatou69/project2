module.exports = function (sequelize, DataTypes) {
    var wishlistItem= sequelize.define("wishlistItem", {
     

        
    });
       
 
 
    

      wishlistItem.associate = function(models){
        //product(url & category) belongs to one Username
        wishlistItem.belongsTo(models.product, {
          foreignKey: {
            allowNull: false
            //cannot create product without usename
          }
        });

        wishlistItem.belongsTo(models.user, {
            foreignKey: {
              allowNull: false
              //cannot create product without usename
            }
          });
      };
      

        return wishlistItem;

    }
//try to read file
        // Try to read from the file system, but move on if there"s an issue.
