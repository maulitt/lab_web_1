const mongoose = require('mongoose');
const argon2 = require('argon2');

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

UserSchema.methods.setPasswd = async function (passwd) {
    this.password = await argon2.hash(passwd);
}
UserSchema.methods.checkPasswd = async function (passwd) {
    const hashy = await argon2.hash(passwd);
    return this.password === hashy;
}


const User = mongoose.model('User', UserSchema);
module.exports.User = User;
