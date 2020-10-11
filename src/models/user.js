const { Model, DataTypes } = require('sequelize');

const sequelize = require('../configs/sequelize');
const Role = require('./role');

class User extends Model{};
User.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataType.UUIDV4
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    sequelize: sequelize.getSequelize()
});

Role.hasMany(User);
User.blongsTo(Role);

module.exports = User;
