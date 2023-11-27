const mongoose = require('mongoose');
const carModel = mongoose.Schema({
    name: String,
    color: String,
    model: String,
    make: String,
    year: String,
    regNo: String,
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
})
module.exports = mongoose.model('Car', carModel);