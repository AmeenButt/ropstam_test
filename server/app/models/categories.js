const mongoose = require('mongoose');
const categoryModel = mongoose.Schema({
    name: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
})
module.exports = mongoose.model('Category', categoryModel);