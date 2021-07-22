const express = require('express')
const Customers = require('../model/customer');
const Joi = require('joi')
const router = express.Router();

router.get('/update' , async (req,res) => {
    const customers = await Customers.find().sort("name");
    res.send(customers);
})

router.get('/:id', async (req,res) => {
    const customers = await Customers.find({ _id: req.params.id})
    const count = await Customers.count()

    if(!customers){
        return res.status(404).send("Sorry!!!!! Not Found")
    }

    res.send("Id ="+ customers +  "Count is " + count)

})


router.post('/', async (req,res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.number().min(3).required(),
        isGold: Joi.boolean()
    })
 
    const ans = schema.validate(req.body)

    if(!ans){
       res.status(404).send(ans.error.details[0].message)
    }
    
    let cst = new Customers({
        name: req.body.name,
        phone: req.body.phone,
        isGold : req.body.isGold
    });

    let result = await cst.save()
    console.log(result)
    
    if(!cst){
        return res.status(404).send("Sorry!!!!! ")
    }

    res.send(cst)

})

router.put('/:id', async (req,res) => {
    const customers = await Customers.findByIdAndUpdate( req.params.id,{
        $set:
        {
          name:req.body.name,
          phone: req.body.phone,
          isGold: req.body.isGold
        }
    }, { new:true })

    if(!customers){
        return res.status(404).send("Sorry!!!!! ")
    }

    res.send(customers)
})

router.delete('/:id', async (req,res) => {
    const customers = await Customers.findByIdAndRemove(req.params.id)

    if(!customers){
        return res.status(404).send("Sorry!!!!! Not Found")
    }

    res.send(customers)
})

module.exports = router;