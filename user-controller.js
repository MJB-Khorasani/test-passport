const userService = require('./user-service');

module.exports.getUsers = async (req, res, next) => {
    let [error, users] = await userService.readUsers({});
    
    req.status = error ? 500 : 200; 
    req.data = users ? users : [];
    req.error = error;
    next();
};

module.exports.createUser = async (req, res, next) => {
    let { email, password } = req.body;
    let [error, user] = await userService.createUser({ 
        email, password 
    }); 

    req.status = error ? 500 : 200; 
    req.data = user ? user : [];
    req.error = error;
    console.log('user created');
    next();
};

module.exports.updateUser = async (req, res, next) => {
    let { id } = req.params;
    let { email, password } = req.body;
    let [ error, data ] = await userService.updateUser(id, {
        email, password
    });

    req.status = error ? 500 : 200; 
    req.data = user ? user : [];
    req.error = error;
    console.log('user updated');
    next();
};

module.exports.deleteUser = async (req, res, next) => {
    let { id } = req.params;
    let { error, user } = await userService.deleteUser(id);

    req.status = error ? 500 : 200; 
    req.data = user ? user : [];
    req.error = error;
    console.log('user deleted');
    next();
};
