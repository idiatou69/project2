var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.user.findAll({
      // include: [db.Post]
    }).then(function (dbuser) {
      // res.json(dbuser);
      res.render("index", {
        msg: "Hello!"
      });
    });
  });


  // Load wishlist page
  app.get("/wishlist", function (req, res) {
    res.render("wishlist", {});
  });

  // Products page
  app.get("/products", function (req, res) {
    // TODO replace this with products list from database
    var products = [
      { id: 1, name: "product name" },
      { id: 2, name: "product name" },
      { id: 3, name: "product name" },
      { id: 4, name: "product name" },
      { id: 5, name: "product name" },
      { id: 6, name: "product name" },
      { id: 7, name: "product name" },
      { id: 8, name: "product name" },
      { id: 9, name: "product name" },
      { id: 10, name: "product name" },
      { id: 11, name: "product name" },
      { id: 12, name: "product name" },
      { id: 13, name: "product name" },
      { id: 14, name: "product name" },
      { id: 15, name: "product name" },
      { id: 16, name: "product name" },
      { id: 17, name: "product name" },
      { id: 18, name: "product name" }
    ];
    res.render("products", {
      products: products
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


  // Load example page and pass in an example by id
  app.get("/user/:id", function (req, res) {
    db.user.findOne({ where: { id: req.params.id } }).then(function (dbuser) {
      res.json(dbuser);
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
