module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      //must have an input
      validate: {
        len: [1]
      }
    },

    category: {
      type: DataTypes.TEXT,
      //possible to add value from drop down?
      allowNull: false,
      validate: {
        len: [1]
      }
    }

  });

  Post.associate = function(models){
    //post(url & category) belongs to one Username
    Post.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false
        //cannot create post without usename
      }
    });
  };

  return Post;
};
