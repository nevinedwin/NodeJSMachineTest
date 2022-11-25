//  navigate to signup
function goToSignup() {
    localStorage.clear()
    $("#main-container").load("./pages/signup.html");
}

// Form Validations
function validateForm(data) {
    if (data.email.length > 0 && !validateEmail(data.email)) {
        return {
            status: false,
            message: "Invalid Email"
        }
    }
    if (Object.values(data).includes("")) {
        return {
            status: false,
            message: "Should fill all the fields"
        };
    }
    return {
        status: true,
        message: "successfully signed up"
    };

}

// email validation
function validateEmail(email) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
        return true;
    }
    return false
}


// login Function
function login() {
    try {

        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        let inputData = {
            email,
            password
        }
        let isValid = validateForm(inputData);
        if (!isValid.status) {
            alert(isValid.message);
            return;
        }
        $.ajax({
            url: "http://localhost:3000/login",
            type: "POST",
            data: JSON.stringify({
                'email': email,
                'password': password
            }),
            success: function (data) {
                goToDashboard();
            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    } catch (error) {
    }
}


function goToDashboard() {
    localStorage.setItem("loggedIn", true)
    $("#main-container").load("./pages/dashboard.html");
}
