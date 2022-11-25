const testRouter = require('../routes');

let body = {
    email: "nevin@gmail.com",
    password: "nevin"
}

let req = {
    url: "/signup",
    method: 'POST',
    body
}

it('has an API worth testing', async () => {
    await testRouter(req)
        .then(function (result) {
            console.log(result);
        })
        .catch(function (err) {
            console.log(err);
        });
    expect(result).toBe({
        email: "",
        password: ""
    });
});