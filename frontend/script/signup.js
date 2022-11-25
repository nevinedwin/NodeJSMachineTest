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
    if (!data.password === data.confirmPassword) {
        return {
            status: false,
            message: "Both password should be same"
        }
    }
    return {
        status: true,
        message: "successfully signed up"
    };

}


function validateEmail(email) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
        return true;
    }
    return false
}




// signIn Function
function signIn() {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let confirmPassword = document.getElementById('confirmPassword').value
    let inputData = {
        email,
        password,
        confirmPassword
    }
    let isValid = validateForm(inputData);
    if (!isValid.status) {
        alert(isValid.message);
        return;
    }
    try {
        $.ajax({
            url: "http://localhost:3000/signup",
            type: "POST",
            data: JSON.stringify({
                'email': email,
                'password': password
            }),
            success: function (data) {
                goToLogin();
            },
            error: function (err) {
                alert(err.responseText)
            }
        });
    } catch (error) {
        console.log(error);
    }
}

function goToLogin() {
    localStorage.setItem('goToSignUp', false)
    $("#main-container").load("./pages/login.html");
}