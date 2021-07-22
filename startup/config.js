const config = require('config')


module.exports = function (){
    if(!config.get('jwtPrivateKey')){
        console.log("FATAL error: jwtPrivateKey is not defined..")
    }
}