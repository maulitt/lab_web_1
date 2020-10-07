const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

//просто из документации к паспорту
passport.use('local',new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, function (email, password, done) {
    User.findOne({ email }, function (err, user) {
        if (err) { return done(err); }
        if(!user) {
            return done(null, false, {message: 'Incorrect username.'});
        }
        if(!user.checkPasswd(password)) {
            return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, user);
    });
}));

exports.passport = passport;