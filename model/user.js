const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi')
const config = require('config')
const jwt = require('jsonwebtoken')
const router = express.Router();

const schema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default : false
    }
})


schema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id, isAdmin:this.isAdmin },config.get('jwtPrivateKey')) 
    return token;
}

const User = mongoose.models.User || mongoose.model('User', schema);

function validate(user){
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email : Joi.string().min(5).required().email(),
        password: Joi.string().required(),
        isAdmin : Joi.boolean()
    })

    return schema.validate(user)
}

module.exports.User = User;
module.exports.validate = validate; 