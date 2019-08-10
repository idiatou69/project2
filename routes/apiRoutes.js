var db = require("../models");

module.exports = function(app) {
  // Get all products
  app.get("/api/products", function(req, res) {
    db.product.findAll({}).then(function(dbproducts) {
      res.json(dbproducts);
    });
  });

  // Create a new product
  app.post("/api/products", function(req, res) {
    db.product.create(req.body).then(function(dbproduct) {
      res.json(dbproduct);
    });
  });

  // Delete an product by id
  app.delete("/api/products/:id", function(req, res) {
    db.product.destroy({ where: { id: req.params.id } }).then(function(dbproduct) {
      res.json(dbproduct);
    });
  });
};
