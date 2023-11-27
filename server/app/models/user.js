const mongoose = require('mongoose');
const userMode = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
})
module.exports = mongoose.model('User', userMode);