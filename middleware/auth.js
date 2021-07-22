const config = require('config')
const jwt = require('jsonwebtoken')

module.exports = function (req,res,next) {

    const token = req.header('x-auth-token') 
    if(!token){
        return res.status(401).send('Access denied. No token.')        
    }

    try{
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'))  // by decoding this it will retun payload
        req.user1 = decoded;
        next();
    }
    catch(ex){
        return res.status(400).send('Invalid')      ;
    }
}

