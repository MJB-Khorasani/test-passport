module.exports.notFound = (req, res, next) => {
    req.status = 404;
    req.data = [];
    req.error = null;
    next();
};

module.exports.internalError = (error, req, res, next) => {
    console.error(error);
    req.status = 500;
    req.data = [];
    req.error = error;
    next();
};
