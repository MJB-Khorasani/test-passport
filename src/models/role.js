const { Model, DataTypes } = require('sequelize');

const sequelize = require('../configs/sequelize');

class Role extends Model {};
Role.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    department: DataTypes.STRING,
    accessLevel: DataTypes.SMALLINT
}, {
    sequelize: sequelize.getSequelize(),
    paranoid: false,
});

module.exports = Role;
