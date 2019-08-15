console.log('js file is linked');


// Get references to page elements
var $productWishedForName = $("#product-wished-for-name");
var $storeIdNumber = $("#store-id-number");
var $productColor = $("#product-color");
var $productWishedForDescription = $("#product-wished-for-description");
var $productSize = $("#product-size");
var $productRating = $("#product-rating");
var $submitBtn = $("#submit");
var $productWishedForList = $("#product-wished-for-list");

// The API object contains methods for each kind of request we'll make
var API = {
  //save the product info in user list (wishlist.html)
  saveProductToWishList: function(product) {
    console.log('running save product');
    
    return $.ajax({
      //how to post in user list instead of on page
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/wishlist",
      data: JSON.stringify(product)
    });
    
  },
  saveSignUpInput: function (signUpInput) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/username",
      data: JSON.stringify(example)
    });
  },
  postProductOnFullList: function(product) {
    return $.ajax({
      type: "POST",
      url: "/api/fulllist",
      data: JSON.stringify(product)
    });
  },

  getProductFromWishList: function() {
    return $.ajax({
      url: "/api/wishlist",
      type: "GET"
    });
  },
  deleteProductfromWishList: function(id) {
    //either id of product or set value
    return $.ajax({
      url: "/api/wishlist/" + id,
      type: "DELETE"
    });
  }
};




//do we need? yes, for when new form is submitted
// refreshProductPage gets new examples from the db and repopulates the list
var refreshProductPage = function() {
  API.getProductFromWishList().then(function(data) {

    console.log(data)
    var $products = data.map(function(productToWishList) {
      var $a = $("<a>")
        .text(productToWishList.name)
        .attr("href", "/wishlist/" + productToWishList.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": productToWishList.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $productWishedForList.empty();
    $productWishedForList.append($products);
  });
};

//have model button with form to input info -- on submit, close modal
// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  console.log('yayyyy!!!');
  
  event.preventDefault();

  var productChosen = {
    store_id: $storeIdNumber.val().trim(),
    name: $productWishedForName.val().trim(),
    color: $productColor.val().trim(),
    size: $productSize.val().trim(),
    rating: $productRating.val().trim(),
    description: $productWishedForDescription.val().trim()
  };

  if (!(productChosen.name && productChosen.description)) {
    alert("You must enter a product name and description!");
    return;
  }

  API.saveProductToWishList(productChosen).then(function() {
     refreshProductPage();
  
  });
  $productRating.val("");
  $productSize.val("");
  $productColor.val("");
  $storeIdNumber.val("");
  $productWishedForName.val("");
  $productWishedForDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  console.log("delete button clicked")
  var idToDelete = $(this)
    .parent()
    .attr("data-id");
  API.deleteProductfromWishList(idToDelete).then(function() {
    refreshProductPage();
  }); 
};


// save the user inputs to the db and refresh the list
var handleSignupFormSubmit = function (event) {
  event.preventDefault();

  var signUpInput = {
    firstName: $("#firstName").val().trim(),
    lastName: $("#lastName").val().trim(),
    username: $("#uname").val().trim(),
    gender: $("#gender").val().trim(),
    email: $("#email").val().trim(),
    password: $("#psw").val().trim(),
    repeatPassword: $("#psw-repeat").val().trim()
  };

  // if (!(signUpInput.firstName && userInput.lastName)) {
  //   alert("You must enter an example text and description!");
  //   return;
  // }

  console.log(signUpInput);

  API.saveSignUpInput(signUpInput).then(function () {
    // refreshExamples();
    alert("account created");
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

var handleLoginFormSubmit = function (event) {
  event.preventDefault();

  var userInput = {
    name: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$productWishedForList.on("click", ".delete", handleDeleteBtnClick);
$loginBtn.on("click", handleLoginFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
$signUpBtn.on("click", handleSignupFormSubmit);