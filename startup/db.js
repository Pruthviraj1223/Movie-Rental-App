const mongoose = require('mongoose')
const winston = require('winston')

module.exports = function () {
    
    mongoose.connect('mongodb://localhost/MOVIES',{ useNewUrlParser: true },{ useUnifiedTopology: true })
        .then(() => winston.info("Movie Database connected "))
}