const jwt = require('jsonwebtoken');
const config = require('../config/index');

module.exports = {
    redirectOnNotLogged: function(req, res, next) {
        // check session
        var token = req.session.token;

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, config.jwt.secret, function(err, decoded) {
                if (err) {
                    return res.redirect('/login');
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // if there is no token
            // return an error
            return res.redirect('/login');

        }

    },
    rejectOnNotLogged: function(req, res, next) {
        // check session
        var token = req.session.token;

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, config.jwt.secret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    }
};
