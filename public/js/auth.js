$("#signUpBtn").on("click", function (e) {
    e.preventDefault();
    var form = {
        name: $("#username").val().trim(),
        email: $("#email").val().trim(),
        password: $("#password").val().trim(),
        password2: $("#repeatPassword").val().trim(),
    }

    if (!form.name || !form.email || !form.password || !form.password2) {
        var errormsg = "please fill in all the fields";
        var err = "<p style= color:red;text-align:center>" + errormsg + "</p>"
        $("#errmsg").html(err);
    } else {
        if (form.password !== form.password2) {
            var errormsg = "password do not match";
            var err = "<p style= color:red;text-align:center>" + errormsg + "</p>"
            $("#errmsg").html(err);
        } else if (form.password.length < 7) {
            var errormsg = "password should be at least 8 caracters";
            var err = "<p style= color:red;text-align:center>" + errormsg + "</p>"
            $("#errmsg").html(err);
        } else if (!validateEmail(form.email)) {
            var errormsg = "you need to insert a valid email";
            var err = "<p style= color:red;text-align:center>" + errormsg + "</p>"
            $("#errmsg").html(err);
        } else {
            $.ajax({
                type: "POST",
                data: form,
                success(data, textStatus, jqXHR) {
                    var statusCode = jqXHR.status;
                    // var statusText = jqXHR.statusText;
                    if (statusCode == 200) {
                        var errormsg = "registation was succesful";
                        var err = "<p style= color:green;text-align:center>" + errormsg + "</p>"
                        $("#errmsg").html(err);
                        setTimeout(function () { location.href = "/wishlist" }, 1000)
                    } else {
                        var errormsg = "this email has been used befor use a different email";
                        var err = "<p style= color:red;text-align:center>" + errormsg + "</p>"
                        $("#errmsg").html(err);
                    }

                }
            })
        }
    }
});

$("#loginBtn").on("click", function (e) {
    e.preventDefault();
    var form = {
        email: $("#email").val().trim() ,
        password: $("#password").val().trim(),
    }
    console.log(form)
    if (!form.email || !form.password) {
        var errormsg = "you need to provide an Email and a password";
        var err = "<p style= color:red;text-align:center>" + errormsg + "</p>"
        $("#errmsg").html(err);
    } else {
        if (!validateEmail(form.email)) {
            var errormsg = "you need to insert a valid email";
            var err = "<p style= color:red;text-align:center>" + errormsg + "</p>"
            $("#errmsg").html(err);
        } else if (form.password.length < 7) {
            var errormsg = "password should be at least 8 caracters";
            var err = "<p style= color:red;text-align:center>" + errormsg + "</p>"
            $("#errmsg").html(err);
        } else {


            $.ajax({
                type: "POST",
                data: form,
                crossDomain: true,
                success(res) {
                    if (res.message == "success") {
                        var errormsg = "Success";
                        var err = "<p style= color:green;text-align:center>" + errormsg + "</p>"
                        $("#errmsg").html(err);
                        setTimeout(function () { location.href = "/wishlist" }, 1000)
                    } else {
                        var errormsg = res.message;
                        var err = "<p style= color:red;text-align:center>" + errormsg + "</p>"
                        $("#errmsg").html(err);
                    }
                }
            })
        }
    }
})

$("#logout").on("click", function (e) {
    e.preventDefault();
    location.href = "/logout"
})
$("#loginBtnw").on("click", function (e) {
    e.preventDefault();
    location.href = "/login"
})
$("#signUpBtnw").on("click", function (e) {
    e.preventDefault();
    location.href = "/signup"
})
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}