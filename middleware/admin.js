module.exports = function (req,res,next) {
    if(!req.user1.isAdmin){
        return res.status(403).send("Invalid. Not authorized")
    }

    next();
}