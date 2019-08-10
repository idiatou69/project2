var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    console.log(' i am the / route')
    db.WishList.findAll({
      // include: [db.Post]
    }).then(function (dbWishList) {
      console.log('----', dbWishList )
      res.render("index", {
        products: dbWishList
      });
    });
  });


  // Load wishlist page
  app.get("/wishlist", function (req, res) {
    res.render("wishlist", {});
  });

  // Load signup page
  app.get("/signup", function (req, res) {
    res.render("signup", {});
  });

  // Load login page
  app.get("/login", function (req, res) {
    res.render("login", {});
  });


  // Load example page and pass in an example by id
  app.get("/wishlist/:id", function (req, res) {
    db.WishList.findOne({ where: { id: req.params.id } }).then(function (dbProductWishList) {
      res.render("product wish list",{
        product: dbWishList
      });

    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
