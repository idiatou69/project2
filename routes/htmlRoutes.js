var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    console.log(' i am the / route')
    db.WishList.findAll({
      // include: [db.Post]
    }).then(function (dbWishList) {
      console.log('----')
      res.render("index", {
        products: dbWishList
      });
    });
  });


  // get one item's details from wish list
  app.get("/wishlist/:id", function (req, res) {
    db.WishList.findOne({ where: { id: req.params.id }
    }).then(function(dbWishList){
      console.log("goes through id")
    res.render("wishlist", {
      product: dbWishList
    });
    });
  });

  // Load signup page
  app.get("/signup", function (req, res) {
    res.render("signup", {});
  });

  // Load login page
  app.get("/login", function (req, res) {
    res.render("login", {});
  });

   // Load stores page
   app.get("/stores", function (req, res) {
    res.render("stores", {});
  });

   // Load products page
   app.get("/products", function (req, res) {
    res.render("products", {});
  });
 

  // leads to all products on wish list to see all details
  app.get("/fulllist", function (req, res) {
    db.WishList.findAll({}
    ).then(function(dbWishList){
      console.log("goes through id")
    res.render("fulllist", {
      product: dbWishList
    });
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};