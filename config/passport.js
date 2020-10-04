const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const mongoose = require('mongoose');
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = mongoose.model('User');

//просто из документации к паспорту
passport.use(new LocalStrategy({
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
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if(err) { return done(err,false); }
        if (user) { return done(null, user); }
        else { return done(null, false); }
    })
}))

exports.passport = passport;