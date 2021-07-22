
const winston  = require('winston')
require('winston-mongodb')
module.exports = function (err,req,res,next) {

    winston.error(err.message, err);

    res.status(500).send("Something Failed .....")
}