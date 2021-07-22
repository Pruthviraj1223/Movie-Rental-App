const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi')
const router = express.Router();

const schema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    gen:{
        type:String,
        required: true,
    }
})

const Genre = mongoose.models.Genre || mongoose.model('Genre', schema);

module.exports.Genre = Genre;
module.exports.genreschema = schema; 