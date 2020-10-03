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
    //hash: {
    //    type: String
    //}
});

UserSchema.methods.setPasswd = function (passwd) {
    this.password = argon2.hash(passwd);
}
UserSchema.methods.checkPasswd = function(passwd) {
    const hashy = argon2.hash(passwd);
    return this.password === hashy;
}
UserSchema.methods.createJWT = function() {
    //to date or not to date - that is a question
    return jwt.sign({
        email: this.email,
        id: this._id
    }, 'secret');
}

UserSchema.methods.sendJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.createJWT()
    };
}

const User = mongoose.model('User', UserSchema);
module.exports.User = User;
