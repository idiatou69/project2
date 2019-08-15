module.exports = function(sequelize, DataTypes) {
    var product = sequelize.define("product", {

       
      name: {
        type: DataTypes.STRING,
        //products  
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        //must have an input
        validate: {
          len: [1]

        }
      },
  
      price: {
        type: DataTypes.DECIMAL,
        //products  
        allowNull: false,
        validate: {
          len: [1]
        }
      },

      
      image_url: {
        type: DataTypes.STRING,
        //products  
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      
      category: {
        type: DataTypes.STRING,
        //products  
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      gender: {
        type: DataTypes.STRING,
        //products  
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      
      
  
    });
  
    product.associate = function(models){
      //stores(url & category) belongs to one Username
      product.belongsTo(models.store, {
        foreignKey: {
          allowNull: false
          //cannot create stores without usename
        }
      });
    };
    

    return product;
  };
 