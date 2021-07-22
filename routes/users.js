const express = require("express");
const router = express.Router();
const { User, validate } = require("../model/user");
const Joi = require("joi");
const config = require('config')
const jwt = require('jsonwebtoken')
const lodash = require("lodash")
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')


router.get("/me",auth, async (req,res) => {
    const user = await User.findById(req.user1._id).select('-password')
    res.send(user)
})

router.post("/", async (req,res) =>{

    const ans = validate(req.body)

    if(ans.error){
        res.status(404).send(ans.error.details[0].message)
     }

    const user = await User.findOne({email: req.body.email})
     if(user){
        res.status(404).send('user aleady exists.')
     }

    let user1 = new User(
        lodash.pick(req.body, ['name','email','password','isAdmin'])
    )

    const salt = await bcrypt.genSalt(10)
    user1.password = await bcrypt.hash(user1.password,salt)

    const userObject = await user1.save()
  
    let token = user1.generateAuthToken()
    res.header('x-auth-token',token).send(lodash.pick(user1, ['_id','name','email','isAdmin']))
    
})



module.exports = router;