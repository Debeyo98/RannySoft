const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
    store_name: String,
    email: String,
    password: String,
    phone_number: Number,
    address: String,
    date_registered: {
        type: Date,
        default: Date.now()
    }
}); 

module.exports = { 
    Store: mongoose.model('store', storeSchema)
};