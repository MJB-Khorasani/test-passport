const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

var _db;

module.exports.connect = async () => {
    let client = await MongoClient.connect('mongodb://127.0.0.1:27017/test-passport?retryWrite=true', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    _db = client.db();
    console.log('mongodb connected: %s', 'mongodb://127.0.0.1:27017/test-passport?retryWrite=true');
    return _db;
};

module.exports.getDb = () => {
    return _db ? _db : null;
};
