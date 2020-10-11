const { ObjectId } = require('mongoose');
const User = require('../models/user');

module.exports.readUsers = async opt => {
    let users = await User.find(opt);
    
    return users ? users : [];
};

module.exports.readUser = async opt => {
    let user = await User.findOne(opt);

    return user ? user : {};
};

module.exports.createUser = async user => {
    let data = await User.create(user);

    return data ? data : [];
};

module.exports.updateUser = async (id, user) => {
    let data = await User.update({ 
        _id: ObjectId(id) 
    }, user);
    
    return data ? data : null;
};

module.exports.deleteUser = async id => {
    let data = await User.deleteOne({ 
        _id: ObjectId(id) 
    });
 
    return data ? data : null;
};
