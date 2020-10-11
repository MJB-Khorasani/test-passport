const { promises: fsPromises } = require('fs');
const path = require('path');

const { ObjectId } = require('mongoose');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const User = require('../models/user');

const PUBLIC_KEY_PATH = path.join(__dirname, '..', '..', 'keys', 'id_rsa_public.pem');
const PUBLIC_KEY = fsPromises.readFile(PUBLIC_KEY_PATH);

var jwtStrategy = new JwtStrategy({
    algorithms: ['RS256'],
    secretOrKey: PUBLIC_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (payload, callback) => {
    try {
        let user = await User.findOne({
            _id: ObjectId(payload.sub)
        });

        if (!user) callback(null, false);
        else callback(null, user);
    } catch (error) {
        callback(error, null);
    };
});

passport.use(jwtStrategy);
passport.serializeUser((user, callback) => {
    callback(null, user._id);
});
passport.deserializeUser(async (id, callback) => {
    let user = await User.findOne({
        _id: ObjectId(id)
    });

    callback(null, user);
});