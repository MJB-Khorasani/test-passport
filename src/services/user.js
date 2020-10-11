const { ObjectId } = require('mongoose');
const User = require('../models/user');

module.exports.readUsers = async opt => {
    let users = await User.find(opt);
    
    return users ? users : null;
};

module.exports.readUser = async opt => {
    let user = await User.findOne(opt);

    return user
};

module.exports.createUser = async user => {
    await User.create(user);

    return data ? data.ops[0] : [];
};

module.exports.updateUser = async (id, user) => {
    let data = await User.update({ 
        _id: ObjectId(id) 
    }, user);
    
    return data ? data : null;
};

module.exports.deleteUser = async id => {
    let db = mongodb.getDb();
    let data = await db.collection('users').deleteOne({ _id: ObjectID(id) });
 
    return data ? data : null;
};
