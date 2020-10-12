const mongodb = require('../configs/mongodb');

class Token {
    constructor(token, type, userId) {
        this.type = type;
        this.token = token;
        this.userId = userId;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    };

    async insertOne(opt) {
        let db = mongodb.getDb();
        await db.collection('tokens').insertOne(this, opt);
    };

    static async insertOne (token, opt) {
        let db = mongodb.getDb();
        token.createdAt = Date.now();
        token.updatedAt = Date.now();
        await db.collection('tokens').insertOne(token, opt);
    };

    static async find(query, opt) {
        let db = mongodb.getDb();
        return await db.collection('tokens').find(query, opt);
    };

    static async findOne(query, opt) {
        let db = mongodb.getDb();
        return await db.collection('tokens').findtOne(query, opt);
    };

    static async findOneAndDelete(filter, opt) {
        let db = mongodb.getDb();
        return await db.collection('tokens').findtOne(filter, opt);
    };

    static async findOneAndUpdate(filter, update, opt) {
        let db = mongodb.getDb();
        return await db.collection('tokens').findtOne(filter, opt);
    };
};

module.exports = Token;