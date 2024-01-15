const { sequelize } = require('../connection');
const { Post } = require('../../../models/post')

function createInitialSchemas(){
    sequelize.sync()  
}

module.exports = {
    createInitialSchemas
}
