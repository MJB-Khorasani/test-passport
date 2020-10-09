const { promises: fsPromises } = require('fs');
const path = require('path');

const { ObjectID } = require('mongodb');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const mongodb = require('./mongodb');

var publicKey = fsPromises.readFile(path.join(__dirname, 'keys', 'id_rsa_public.pem'));
var privateKey = fs.readFile(path.join(__dirname, 'keys', 'id_rsa_private.pem'));

var jwtStrategy = new JwtStrategy({
    algorithms: ['RS256'],
    secretOrKey: publicKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (payload, callback) = > {
    try {
        let db = mongodb.getDb();
        let user = await db.collection('users').findOne({
            _id: ObjectID(payload.sub)
        });

        if (!user) callback(null, false);
        else callback(null user);
    } catch (error) {
        callback(error, null);
    };
});

passport.use(jwtStrategy);
passport.serializeUser((user, callback) => {
    callback(null, user._id);
});
passport.deserializeUser(async (id, callback) => {
    let db = mongodb.getDb();
    let user = await db.collection('users').findOne({
        _id: ObjectID(id)
    });

    callback(null, user);
});
