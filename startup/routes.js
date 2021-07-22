
const express = require('express')
const Customers = require('../routes/customers')
const movies = require('../routes/movies')
const genres = require('../routes/genres')
const rentals = require('../routes/rentals')
const user = require('../routes/users')
const auth = require('../routes/auth')
const moragn = require('morgan')
const error = require('../middleware/error')


module.exports = function (app){

    app.use(express.json())  
    app.use(moragn('short'))
    app.use('/movies/customers',Customers); 
    app.use('/movies/genres',genres);
    app.use('/movies',movies);
    app.use('/movies/rentals', rentals);
    app.use('/movies/user', user);
    app.use('/movies/auth', auth);
    app.use(error)

}