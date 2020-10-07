const mongodb = require('./mongodb');

module.exports.readUsers = async opt => {
    let db = mongodb.getDb();
    let {error, users} = await db.collection('users').find(opt).toArray();
    
    return error ? [error, users] : [null, users];
};

module.exports.createUser = async user => {
    let db = mongodb.getDb();
    let {error, data} = await db.collection('users').insertOne(user);

    return error ? [error, data] : [null, data];
};

module.exports.updateUser = async (id, user) => {
    let db = mongodb.getDb();
    let {error, data} = await db.collection('users').updateOne({
        _id: id
    }, user);
    
    return error ? [error, data] : [null, data];
};

module.exports.deleteUser = async id => {
    let db = mongodb.getDb();
    let {error, user} = await db.collection('users').deleteOne({
        _id: id
    });
 
    return error ? [error, user] : [null, user];
};
