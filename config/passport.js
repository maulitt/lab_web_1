const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const CookieStrategy = require('passport-cookie').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const argon2 = require('argon2');

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
passport.use('registration', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function(name, email, password, done) {
    if(!email) {
        return done(null, false, {message: 'email is needed'});
    }
    if(!password) {
        return done(null, false, {message: 'password is needed'});
    }
    User.findOne( { email: email }, (err, user) => {
        if(err) { throw err; }
        if(user) { return done(null, false, { message: 'Email is used by smn else.'}); }
    });
    let passwd = await argon2.hash(password);
    const newUser = new User({
        email: email,
        password: passwd,
        name: name
    });
    await newUser.save();
}))


passport.use('cookie', new CookieStrategy({
    cookieName: 'cookie',
    signed: true,
    passReqToCallback: true
}, function(req, cookie, done) {
    User.findOne({ email: req.user.email }, (err, user) => {
        if(err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
    });
}))

passport.serializeUser((user, done) => {
    done(null, user._id);
})
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(null,user);
    });
})

module.exports.passport = passport;