module.exports = function(sequelize, DataTypes){
    var Username = sequelize.define("Username",{
        name: DataTypes.STRING
        //user will type their username(into the parent table)- to bring up previous saves(url and category in child table)
    });

    Username.associate = function(models){
        //username in connected to post.js
        Username.hasMany(models.Post, {
            onDelete: "cascade"
            //if author is deleted, also delete from post
        });
    };
    return Username
};