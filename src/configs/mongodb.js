const mongodb = require('mongodb');

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

var _db;

mongodb.connect(MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(client => {
    _db = client.db();
    console.log('mongodb connected: %s', MONGODB_CONNECTION_STRING)
});

module.exports.getDb = () => _db ? _db : null;