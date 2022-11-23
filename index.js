
let inputValues = {
    email: "",
    password: "",
    confirmPassword: ""
}

// changing input
function changeInput(val, name) {
    inputValues = {
        ...inputValues,
        [name]: val
    }
}

// signIn Function
function signIn() {
    console.log(inputValues);
    if (!validateForm(inputValues)) {
        console.log("please fill all fields");
        return;
    }
    console.log("formSubmitted");
}


// Form Validations
function validateForm(inp) {
    if (Object.values(inp).includes("")) {
        return false;
    }
    return true;

}