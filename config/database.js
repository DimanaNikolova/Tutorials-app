const mongoose = require('mongoose');
const config = require('./config');
const dbName = 'tutorials';

module.exports = () => {
    return mongoose.connect(config.dbURL + dbName, 
        {useNewUrlParser:true, useUnifiedTopology:true},
        console.log('Database is ready!')
    )
}