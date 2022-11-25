// Form Validations
function validateForm(data) {
    if (Object.values(data).includes("")) {
        return {
            status: false,
            message: "field should have values"
        };
    }
    if (data.password === data.confirmPassword) {
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

module.exports = validateForm;