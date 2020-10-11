const router = require('express').Router();

const userController = require('./user-controller');
const { asyncMiddlewareHandler } = require('./promise');

router
    .route('/')
    .get(asyncMiddlewareHandler(userController.getUsers))
    .post(asyncMiddlewareHandler(userController.createUser));

router
    .route('/:id')
    .put(asyncMiddlewareHandler(userController.updateUser))
    .delete(asyncMiddlewareHandler(userController.deleteUser));

module.exports = router;
