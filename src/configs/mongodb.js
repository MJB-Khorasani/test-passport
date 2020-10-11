const mongoose = require('mongoose');

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error => {
    if (error) console.error(error);
    else console.log('mongodb connected: %s', MONGODB_CONNECTION_STRING);
});