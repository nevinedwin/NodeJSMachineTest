function logout() {
    localStorage.setItem("loggedIn", false)
    localStorage.setItem("goToSignUp", false)
    $("#main-container").load("./pages/login.html");
}

$(document).ready(function () {
    $('#users-table').DataTable({
        ajax: 'http://localhost:3000/list',
        type: "GET",
        columns: [
            { data: 'email' },
            {
                data: 'createdAt', "render": function (data) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return (month.toString().length > 1 ? month : "0" + month) + "/" + date.getDate() + "/" + date.getFullYear();
                }
            }
        ],
    });
});