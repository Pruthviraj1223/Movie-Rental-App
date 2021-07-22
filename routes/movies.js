const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const {Genre} = require('../model/genre')
const {Movie,validateMovie} = require('../model/movie')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')


router.get('/update' , async (req,res) => {
    const customers = await Movie.find()
    res.send(customers)
})

router.get('/:id', async (req,res) => {
    const movie = await Movie.find({ _id: req.params.id})
    const count = await Movie.count()

    if(!movie){
        return res.status(404).send("Sorry!!!!! Not Found")
    }

    res.send("Id ="+ movie +  "Count is " + count)

})


router.post('/', async (req,res) => {
    
    const isvalid = validateMovie(req.body)
    if(!isvalid){
        console.log("Invalid")
    }

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid')

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name,
            gen: genre.gen
        },
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate
    })

    let result = await movie.save()
    console.log(movie)
    
    if(!movie){
        return res.status(404).send("Sorry!!!!! ")
    }

    res.send(movie)

})

router.delete('/:id', [auth,admin], async (req,res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id)

    if(!movie){
        return res.status(404).send("Sorry!!!!! Not Found")
    }

    res.send(movie)
})

module.exports = router;
