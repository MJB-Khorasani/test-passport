const { ObjectID } = require('mongodb');
const mongodb = require('./mongodb');

module.exports.readUsers = async opt => {
    let db = mongodb.getDb();
    let users = await db.collection('users').find(opt).toArray();
    
    return users ? users : null;
};

module.exports.createUser = async user => {
    let db = mongodb.getDb();
    let data = await db.collection('users').insertOne(user);

    return data ? data.ops[0] : [];
};

module.exports.updateUser = async (id, user) => {
    let db = mongodb.getDb();
    let data = await db.collection('users').updateOne({ _id: ObjectID(id) }, { $set: user });
    
    return data ? data.result : null;
};

module.exports.deleteUser = async id => {
    let db = mongodb.getDb();
    let data = await db.collection('users').deleteOne({ _id: ObjectID(id) });
 
    return data ? data.result : null;
};
