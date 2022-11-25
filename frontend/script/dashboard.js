function logout() {
    localStorage.setItem("loggedIn", false)
    localStorage.setItem("goToSignUp", false)
    $("#main-container").load("./pages/login.html");
}

jQuery.ajaxSetup({ cache: true });
$(document).ready(function () {
    $('#users-table').DataTable({
        ajax: 'http://localhost:3000/list',
        type: "GET",
        columns: [
            { data: 'email' }
        ],
    });
});