const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, "User must have an Email"]
    },
    password: {
        type: String,
        require: [true, "User must have a password"]
    }
});

module.exports = mongoose.model("UserSchema", userSchema)

