const mongoose = require('mongoose');
const bcypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    dob : {
        type: Date
    },
    username : {
        type: String,
        requires: true,
        trim: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    }    
});

const User = mongoose.model('Usesr', userSchema, 'users')

module.exports = User;
