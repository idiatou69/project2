console.log('js file is linked');


// Get references to page elements
var $productWishedForName = $("#product-wished-for-name");
var $productWishedForDescription = $("#product-wished-for-description");
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
  getProductFromWishList: function() {
    return $.ajax({
      url: "api/wishlist",
      type: "GET"
    });
  },
  deleteProductfromWishList: function(id) {
    //either id of product or set value
    return $.ajax({
      url: "api/wishlist" + id,
      type: "DELETE"
    });
  }
};

//do we need? yes, for when new form is submitted
// refreshExamples gets new examples from the db and repopulates the list
var refreshProductPage = function() {
  API.getProductFromWishList().then(function(data) {

    console.log("data-", data);

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
        .addClass("btn btn-danger float-right delete")
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
    name: $productWishedForName.val().trim(),
    description: $productWishedForDescription.val().trim()
  };

  if (!(productChosen.name && productChosen.description)) {
    alert("You must enter a product name and description!");
    return;
  }

  API.saveProductToWishList(productChosen).then(function() {
    refreshProductPage();
  });

  $productWishedForName.val("");
  $productWishedForDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteProductfromWishList(idToDelete).then(function() {
    refreshProductPage();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$productWishedForList.on("click", ".delete", handleDeleteBtnClick);
