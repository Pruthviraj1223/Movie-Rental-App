const mongoose = require('mongoose')
const express = require('express')



const schema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    phone:{
        type:Number,
        required: true
    },
    isGold:{ type: Boolean , default: false }
})

const Customers = mongoose.models.Customers || mongoose.model('Customers', schema);

module.exports = Customers;