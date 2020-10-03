//const express = require('express');
//const router = express.Router();
const jwt = require('express-jwt');

const TokenFromHeader = function(req) {
    //нашла в документации к express-jwt:
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: TokenFromHeader  //из документации express-jwt
    }),
    optional: jwt({ //для регистрации новых
        secret: 'secret',
        userProperty: 'payload',
        getToken: TokenFromHeader,
        credentialsRequired: false
    })
}

module.exports = auth;