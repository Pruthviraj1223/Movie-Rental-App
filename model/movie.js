const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi')
const {Genre , genreschema} = require('./genre'); 

const movieSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    genre: {
      type: genreschema,
      required: true
    },
    numberInStock: {
      type: Number,
      default: 0
    },
    dailyRentalRate: {
      type: Number,
      default: 0
    }
  });


function validateMovie(movie) {
    const schema = Joi.object({
      title: Joi.string()
        .min(5)
        .max(50)
        .required(),
      genreId: Joi.string().required(),
      numberInStock: Joi.number()
        .min(0)
        .required(),
      dailyRentalRate: Joi.number()
        .min(0)
        .required()
    });

    return schema.validate(movie)
}


const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;