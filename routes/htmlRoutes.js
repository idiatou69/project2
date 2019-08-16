var db = require("../models");
var bcrypt = require("bcrypt");
var passport = require("passport");
var  checkAuth  = require("../config/auth-check")

module.exports = function (app) {


  // delete request from wishlist 
  app.delete("/wishlist", function (req, res) {
    
    var id = parseInt(req.body.productId);
    db.wishlistItem.destroy({
      where: {
        productId : id,
        userId : req.user.id
      }
  })
  
})


  // Load index page
  app.get("/", function (req, res) {
    res.render("welcome")
  });


  // Products page
  app.get("/products",checkAuth, function (req, res) {
    // TODO replace this with products list from database
    db.product.findAll().then(function (products) {
      res.render("products", {products})
    
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
  //  logout go back to login 
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
  });

  // Load stores page
  app.get("/stores", checkAuth,  function (req, res) {
    res.render("stores");
  });
  app.get("/welcome", function (req, res) {
    res.render("welcome", {});
  });
  // load wishlist 
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
  // sign up post 
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
  // stores post request 
  app.post("/stores", function (req, res) {
    console.log(req.body.storeId);
    db.product.findAll({ where: { storeId: req.body.storeId } }).then(function (products) {
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(products));
      
    })
    
  });
  // put request stors 
  app.put("/stores", function (req, res) {
    var productId = parseInt(req.body.productId);
    var userId = req.user.id;
    db.wishlistItem.create({ productId : productId , userId : userId}).then(function (whishitems) {
      console.log(whishitems)
    })
  })

  // put request products 
  app.put("/products", function (req, res) {
    var productId = parseInt(req.body.productId);
    var userId = req.user.id;
    db.wishlistItem.create({ productId : productId , userId : userId}).then(function (whishitems) {
      console.log(whishitems)
    })
  })
  
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
