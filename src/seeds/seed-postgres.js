const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, '..', '..', '.env')
});

const sequelize = require('../configs/sequelize');

(async function() {
    await sequelize.getSequelize().sync({ force: true });
    require('./role');
    require('./user');
})();