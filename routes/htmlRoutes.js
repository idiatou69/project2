var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
<<<<<<< HEAD

    // Boilerplate code given in class on first day of project
    //
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });

    res.render("index", {});
  });
=======
    db.Username.findAll({
      include: [db.Post]
    }).then(function(dbUsername) {
      // res.json(dbUsername);
      res.render("index", {
        msg: "Hello!"
      });

      });
    });
 
>>>>>>> master

  // Load example page and pass in an example by id
  app.get("/username/:id", function(req, res) {
    db.Username.findOne({ where: { id: req.params.id } }).then(function(dbUsername) {
      res.json(dbUsername);
      });
    });
 

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
