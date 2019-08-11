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

  // Create a new product on wish list in index
  app.post("/api/wishlist", function(req, res) {
    console.log('route hit1!');
    
    db.WishList.create(req.body).then(function(dbWishList) {
      res.json(dbWishList);
    });
  });


  app.post("/api/fulllist", function(req, res) {
    console.log('route hit2!!');
    
    db.WishList.create(req.body).then(function(dbWishList) {
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
