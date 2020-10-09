const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const CookieStrategy = require('passport-cookie').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

//для проверки старых пользователей (из документации)
passport.use('local',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    console.log('proverka');
    User.findOne({ email: email }, function (err, user) {
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

passport.use('cookie', new CookieStrategy({
    cookieName: 'cookie',
    signed: true,
    passReqToCallback: true
}, function(req, cookie, done) {
    User.findOne({ email: req.body.email }, (err, user) => {
        if(err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
    });
}))


module.exports.passport = passport;