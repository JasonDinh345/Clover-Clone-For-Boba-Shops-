const express = require('express')
const router = express.Router()
const Toppings = require('../models/toppings')
//Get All
router.get('/',  async(req, res) =>{
    try{
        const toppings = await Toppings.find()
        res.json(toppings)
    }catch (err){
        res.status(500).json({message: err.message})
    }
})
//Get one
router.get('/:id', getToppings, (req, res) =>{
    res.json(res.topping)
})
//Create one
router.post('/',  async (req, res) =>{
    const topping = new Toppings({
        name: req.body.name,
        price: req.body.price

    })
    try {
        const newTopping = await topping.save()
        res.status(201).json(newTopping)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Update One
router.patch('/:id', getToppings,  async(req, res) =>{
    if(req.body.name != null){
        res.topping.name = req.body.name
    }
    if(req.body.price != null){
        res.topping.price = req.body.price
    }
    try{
        const updatedTopping = await res.topping.save()
        res.json(updatedTopping)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Delete One
router.delete('/:id', getToppings,  async(req, res) =>{
    try{
        await res.topping.deleteOne();
        res.json({message: "Deleted Topping"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getToppings(req, res, next){
    let topping
    try{
        topping = await Toppings.findById(req.params.id)
        if (topping == null){
            return res.status(404).json({message: "Couldn't Find Topping"})
        }
    }catch(err){
        return res.status(500).json({message: err.messege})
    }
    res.topping = topping
    next()
}
module.exports = router