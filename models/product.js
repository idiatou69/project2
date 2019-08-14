module.exports = function(sequelize, DataTypes) {
    var product = sequelize.define("product", {

      store_name: {
        type: DataTypes.STRING,
        //products  
        allowNull: false,
        validate: {
          len: [90]
        }
      },
      name: {
        type: DataTypes.STRING,
        //products  
        allowNull: false,
        validate: {
          len: [1000]
        }
      },

      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        //must have an input
        validate: {
          len: [70]

        }
      },
  
      price: {
        type: DataTypes.DECIMAL,
        //products  
        allowNull: false,
        validate: {
          len: [4]
        }
      },

      image_url: {
        type: DataTypes.STRING,
        //products  
        allowNull: false,
        validate: {
          len: [1000]
        }
      },
      
      category: {
        type: DataTypes.STRING,
        //products  
        allowNull: false,
        validate: {
          len: [1000]
        }
      }

  
    });
  
    product.associate = function(models){
      
    };
  

    return product;
  };
 