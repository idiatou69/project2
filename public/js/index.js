// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $loginBtn = $("#loginBtn");
var $exampleList = $("#example-list");
var $signUpBtn = $("#signUpBtn");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/username",
      data: JSON.stringify(example)
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
  getExamples: function () {
    return $.ajax({
      url: "api/username",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/username/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
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
$loginBtn.on("click", handleLoginFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
$signUpBtn.on("click", handleSignupFormSubmit);
