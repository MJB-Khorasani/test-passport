const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, '..', '.env')
});

const express = require('express');
const passport = require('passport');

const sequelize = require('./configs/sequelize');

const app = express();

require('./configs/passport');
require('./configs/mongodb');
const httpStatus = require('./utils/http-status');
const errorMiddleware = require('./middlewares/error');

const APP_PORT = process.env.APP_PORT;
const APP_HOST = process.env.APP_HOST;

app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use('/users', require('./routes/user'));
app.use('/auth', require('./routes/auth'));
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
app.use(errorMiddleware.notFound);
app.use(errorMiddleware.internalError);

app.listen(APP_PORT, APP_HOST, error => {
    sequelize.getSequelize().sync().then(() => console.log('Postgres connected & synchronized.'));
    console.log(`server is up on : http://${APP_HOST}:${APP_PORT}`);
});