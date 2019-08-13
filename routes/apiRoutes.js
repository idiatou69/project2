var db = require("../models");

module.exports = function(app) {
  // Get all products on wish list
  app.get("/api/wishlist/:id", function(req, res) {
    console.log('gets hit');
    
    db.WishList.findAll({}).then(function(dbWishList) {
      console.log(dbWishList);
      
      res.json(dbWishList);
    });
  });

  app.get("/api/wishlist", function (req, res) {
    console.log(' i am the /api/wishlist route')
    db.WishList.findAll({
      // include: [db.Post]
    }).then(function (dbWishList) {
      console.log('----', dbWishList)
      res.json(dbWishList)
    
    });
  });

  // Create a new product on wish list in index
  app.post("/api/wishlist", function(req, res) {
    console.log('route hit1!');
    
    db.WishList.create(req.body).then(function(dbWishList) {
      console.log(dbWishList);
      res.json(dbWishList);
    });
  });


// Next step is to post all saved products on fulllist page
  app.post("/api/fulllist", function(req, res) {
    db.Wishlist.create(req.body).then(function(dbWishList) {
      res.json(dbWishList);
    });
  });

  // Delete a product by id
  app.delete("/api/wishlist/:id", function(req, res) {
    console.log("where delete")

    db.WishList.destroy({ where: { id: req.params.id }
     })

     .then(function(dbWishList) {
      res.json(dbWishList);
      console.log("this is deleting")
    });
  });
};
