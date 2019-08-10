var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/wishlist", function(req, res) {
    db.ProductList.findAll({}).then(function(dbProductList) {
      res.json(dbProductList);
    });
  });

  // Create a new example
  app.post("/api/wishlist", function(req, res) {
    db.ProductList.create(req.body).then(function(dbProductList) {
      res.json(dbProductList);
    });
  });

  // Delete an example by id
  app.delete("/api/wishlist/:id", function(req, res) {
    db.ProductList.destroy({ where: { id: req.params.id } }).then(function(dbProductList) {
      res.json(dbProductList);
    });
  });
};
