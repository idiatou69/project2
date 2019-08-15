var db = require("../models");
var bcrypt = require("bcrypt");
var passport = require("passport");
var  checkAuth  = require("../config/auth-check")

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

  app.post("/signup", function (req, res) {
    var { name, email, password, password2 } = req.body;
    db.user.findOne({ where: { email: email } }).then(function (wishList_db) {
      if (wishList_db == null) {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            hashedPass = hash;
            var newUser = {
              name: name,
              email: email,
              password: hashedPass,
            }
            db.user.create(newUser).then(function (wishList_db) {
              res.sendStatus(200);
              console.log("new user added");
            })
          });
        })
      } else {
        res.sendStatus(202);
        console.log("failed to add a new user: email already exist");
      }
    });
  })
  // login post request 
  app.post("/login", function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.send(info) }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send({message: "success"});
      });
    })(req, res, next);
  });

  // Load signup page
  app.get("/signup", function (req, res) {
    res.render("signup", {});
  });

  // Load login page
  app.get("/login", function (req, res) {
    res.render("login", {});
  });
  //  logout go back to login 
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
  });

  app.get("/welcome", function (req, res) {
    res.render("welcome", {});
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

  app.get("/wishlist", checkAuth , function (req, res) {
    var userId = req.user.id;

    db.wishlistItem.findAll({
      where: { userId: userId },
      include: [{
          model: db.product,
          where: { id : db.Sequelize.col('wishlistItem.productId') }
      }]
  }).then(function (wishlist) {
    wishlist.username = req.user.name;
      res.render("wishlist",{wishlist})
   })
    
  });
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};