const express = require('express')
const router = express.Router()
const Drinks = require('../models/drinks')
//Get All
router.get('/',  async(req, res) =>{
    try{
        const drinks = await Drinks.find()
        res.json(drinks)
    }catch (err){
        res.status(500).json({message: err.message})
    }
})
//Get one
router.get('/:id', getDrink, (req, res) =>{
    res.json(res.drink)
})
//Create one
router.post('/',  async (req, res) =>{
    const drink = new Drinks({
        name: req.body.name,
        price: req.body.price,
        type: req.body.type,
        color: req.body.color,
        order: req.body.order

    })
    try {
        const newDrink = await drink.save()
        res.status(201).json(newDrink)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Update One
router.patch('/:id', getDrink,  async(req, res) =>{
    if(req.body.name != null){
        res.drink.name = req.body.name
    }
    if(req.body.price != null){
        res.drink.price = req.body.price
    }
    if(req.body.type != null){
        res.drink.type = req.body.type
    }
    if(req.body.color != null){
        res.drink.color = req.body.color
    }
    if(req.body.order != null){
        res.drink.order = req.body.order
    }
    try{
        const updatedDrink = await res.drink.save()
        res.json(updatedDrink)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Delete One
router.delete('/:id', getDrink,  async(req, res) =>{
    try{
        await res.drink.deleteOne();
        res.json({message: "Deleted Drink"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getDrink(req, res, next){
    let drink
    try{
        drink = await Drinks.findById(req.params.id)
        if (drink == null){
            return res.status(404).json({message: "Couldn't Find Drink"})
        }
    }catch(err){
        return res.status(500).json({message: err.messege})
    }
    res.drink = drink
    next()
}
module.exports = router