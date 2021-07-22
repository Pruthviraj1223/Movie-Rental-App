const express = require("express");
const router = express.Router();
const { Genre, genreschema } = require("../model/genre");
const Joi = require("joi");
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const asyncMiddleware = require('../middleware/async')

router.get("/update", async (req,res,next) => {
    // throw new Error('could not get genres ....')
    const gen = await Genre.find();
    res.send(gen)
});


router.post("/", async (req,res) =>{

    const schema = Joi.object({
        name: Joi.string().required(),
        gen : Joi.string().required()
    })

    const ans = schema.validate(req.body)

    if(ans.error){
        res.status(404).send(ans.error.details[0].message)
     }

    let gen = new Genre({
        name:req.body.name,
        gen: req.body.gen
    })

    const genObject = await gen.save()
    res.send(gen)
})

router.delete('/:id', auth, async (req,res) => {
    const gen = await Genre.findByIdAndRemove(req.params.id)

    if(!gen){
        return res.status(404).send("Sorry!!!!! Not Found")
    }

    res.send(gen)
})

module.exports = router;