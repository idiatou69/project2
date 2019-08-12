$("#register").on("click", function (e) {
    e.preventDefault();
    var form = {
        name: $('#uname').val().trim(),
        email: $("#email").val().trim(),
        password: $("#psw").val().trim(),
        password2: $("#psw-repeat").val().trim(),
    }
​
    // console.log(validateEmail(form.email))
​
​
    if (!form.name || !form.email || !form.password || !form.password2) {
        var errormsg = "please fill in all the fields";
        var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" + errormsg + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
        $("#errmsg").html(err);
    } else {
        if (form.password !== form.password2) {
            var errormsg = "password do not match";
            var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" + errormsg + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
            $("#errmsg").html(err);
        } else if (form.password.length < 7) {
            var errormsg = "password should be at least 8 caracters";
            var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" + errormsg + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
            $("#errmsg").html(err);
        } else if (!validateEmail(form.email)) {
            var errormsg = "you need to insert a valid email";
            var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" + errormsg + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
            $("#errmsg").html(err);
        } else {
            $.ajax({
                type: "POST",
                data: form,
            }).then(function(){
                var errormsg = "registation was succesful";
                var err = "<div class='alert alert-success' role='alert'>"+errormsg+"</div>"
                 $("#errmsg").html(err);
                 setTimeout(function(){location.href = "/login"},1000)
                
               
            })
        }
​
    }
​
});
​
$("#login").on("click", function (e) {
    e.preventDefault();
    var form = {
        email: $("#email").val().trim(),
        password: $("#password").val().trim(),
    }
    if (!validateEmail(form.email)) {
        var errormsg = "you need to insert a valid email";
        var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" + errormsg + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
        $("#errmsg").html(err);
    } else if (form.password.length < 7) {
        var errormsg = "password should be at least 8 caracters";
        var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" + errormsg + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
        $("#errmsg").html(err);
    } else {
​
​
        $.ajax({
            type: "POST",
            data: form
        }).then(function () {
            console.log("loging in");
​
        });
    }
})
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}