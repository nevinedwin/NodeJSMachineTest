// initail loading
$(function () {
    let isUser = localStorage.getItem("goToSignUp");
    let loggedIn = localStorage.getItem("loggedIn");
    if (JSON.parse(isUser) || isUser === null) {
        $("#main-container").load("./pages/signup.html");
    } else if (JSON.parse(loggedIn) && !JSON.parse(isUser)) {
        $("#main-container").load("./pages/dashboard.html");
    }
    else {
        $("#main-container").load("./pages/login.html");
    }
});

