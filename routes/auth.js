const config = require('config')
const express = require("express");
const router = express.Router();
const { User, validate } = require("../model/user");
const Joi = require("joi");
const lodash = require("lodash")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


////////////// this login page


router.post("/", async (req,res) =>{

    const ans = validatePass(req.body)

    if(ans.error){
        res.status(404).send(ans.error.details[0].message)
     }

    const user = await User.findOne({email: req.body.email})
     if(!user){
        res.status(400).send('Invalid')
     }

    const Ans = await bcrypt.compare(req.body.password , user.password)
     if(!Ans){
        res.status(404).send('Invalid.........')
     }

    let token = user.generateAuthToken()
    res.send(token)
 
})


function validatePass(data) {
    const schema = Joi.object({
        email : Joi.string().min(5).required().email(),
        password: Joi.string().required()
    })

    return schema.validate(data)   
}

module.exports = router;



