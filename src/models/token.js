const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectID = mongoose.ObjectId;

const tokenSchema = new Schema({
    _id: ObjectId,
    token: Object,
    type: String,
    userId: String
}, {
    timestamps: {
        createdAt: 'createdAt'
    }
});

module.exports = mongoose.model('tokens', tokenSchema);
