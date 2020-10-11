const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test-passport?retryWrite=true', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error => {
    if (error) console.error(error);
    else console.log('mongodb connected: %s', 'mongodb://127.0.0.1:27017/test-passport?retryWrite=true');
});