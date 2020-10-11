const httpStatus = require('../utils/http-status');

module.exports.notFound = (req, res, next) => {
    res.json({
        status: httpStatus[2],
        data: [],
        error: null
    });
};

module.exports.internalError = (error, req, res, next) => {
    console.error(error);
    
    res.json({
        status: httpStatus[3],
        data: [],
        error
    });
};
