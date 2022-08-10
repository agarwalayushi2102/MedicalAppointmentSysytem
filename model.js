

const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    date : {
        type: String,
        required: true,
        unique: true
    },
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    }
    
    
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;