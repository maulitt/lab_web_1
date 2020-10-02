const mongoose = require('mongoose');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hash: {
        type: String
    }
});

