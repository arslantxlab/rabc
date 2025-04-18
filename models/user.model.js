const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'manager', 'admin']
    }
});


const User = mongoose.model('User', userSchema)


module.exports = {
    User
}

