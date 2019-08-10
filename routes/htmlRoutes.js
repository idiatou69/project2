var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.ProductList.findAll({
      // include: [db.Post]
    }).then(function (dbProductList) {
      res.render("index", {
        products: dbProductList
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
    db.ProductList.findOne({ where: { id: req.params.id } }).then(function (dbProductList) {
      res.render("product",{
        product: dbProductList
      });

    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
