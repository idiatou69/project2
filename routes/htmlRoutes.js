var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Username.findAll({
      include: [db.Post]
    }).then(function (dbUsername) {
      // res.json(dbUsername);
      res.render("index", {
        msg: "Hello!"
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


  // Load example page and pass in an example by id
  app.get("/username/:id", function (req, res) {
    db.Username.findOne({ where: { id: req.params.id } }).then(function (dbUsername) {
      res.json(dbUsername);
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
