const express = require('express');
const passport = require('passport');

const app = express();


require('./passport');
require('./mongodb').connect();
const httpStatus = require('./http-status');
const errorController = require('./error-controller');

app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use('/users', require('./user-routes'));
app.use('/auth', require('./auth-routes'));
app.use((req, res) => {
    let resObject = {
        status: '',
        data: [],
        error: null
    };
    switch (req.status) {
        case 200:
        case 201:
            resObject.status = httpStatus[1];
            resObject.data = req.data;
            resObject.error = req.error;
            break;
        case 401:
            resObject.status = httpStatus[4];
            resObject.data = req.data;
            resObject.error = req.error;
            break;
        case 403:
            resObject.status = httpStatus[5];
            resObject.data = req.data;
            resObject.error = req.error;
            break;
        default: 
            resObject.status = httpStatus[6];
            resObject.data = req.data;
            resObject.error = req.error;
            break;
    };

    res.json(resObject);
});
app.use(errorController.notFound);
app.use(errorController.internalError);

app.listen(3000, console.log);
