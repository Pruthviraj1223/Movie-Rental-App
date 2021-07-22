const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Fawn = require("fawn");
const { Rental, validateRental } = require('../model/rental');
const Customers = require("../model/customer");
const {Movie, validateMovie} = require("../model/movie");
const auth = require('../middleware/auth')

Fawn.init(mongoose);

router.get('/update', async (req,res) =>{
    const rental = await Rental.find().sort('-dateOut')
    res.send(rental)
})

router.post('/', async (req,res) =>{

    const { error } = validateRental(req.body)
    if(error){
        res.status(400).send("Not Ok")
    }

    const movie = await Movie.findById(req.body.movieId); 
    if(!movie) return res.status(400).send('Invalid')
    
    const customer = await Customers.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid')

    if(movie.numberInStock === 0){
        res.status(400).send('IT IS FULL');
    }

    let rental = new Rental({
        customer :{
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie:{
            _id: movie._id,
            title:movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    new Fawn.Task()
        .save('rentals', rental)
        .update('movies',{
            _id: movie._id
        },
        {
            $inc:{
                numberInStock: -1
            }
        }
        )
        .run()

        res.send(rental)

})


module.exports = router;