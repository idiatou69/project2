// Get references to page elements
var $productName = $("#product-name");
var $productDescription = $("#product-description");
var $submitBtn = $("#submit");
var $productList = $("#product-list");

// The API object contains methods for each kind of request we'll make
var API = {
  //save the product info in user list (wishlist.html)
  saveProduct: function(product) {
    return $.ajax({
      //how to post in user list instead of on page
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/wishlist",
      data: JSON.stringify(product)
    });
  },
  getProduct: function() {
    return $.ajax({
      url: "api/wishlist",
      type: "GET"
    });
  },
  deleteProduct: function(id) {
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
  API.getProduct().then(function(data) {
    var $products = data.map(function(product) {
      var $a = $("<a>")
        .text(product.name)
        .attr("href", "/wishlist/" + product.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": product.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $productList.empty();
    $productList.append($products);
  });
};

//have model button with form to input info -- on submit, close modal
// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var productChosen = {
    name: $productName.val().trim(),
    description: $productDescription.val().trim()
  };

  if (!(productChosen.name && productChosen.description)) {
    alert("You must enter a product name and description!");
    return;
  }

  API.saveProduct(productChosen).then(function() {
    refreshProductPage();
  });

  $productName.val("");
  $productDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteProduct(idToDelete).then(function() {
    refreshProductPage();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$productList.on("click", ".delete", handleDeleteBtnClick);
