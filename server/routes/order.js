const express = require('express')
const router = express.Router()
const Order = require('../models/order')
//Get All
router.get('/',  async(req, res) =>{
    try{
        const order = await Order.find()
        res.json(order)
    }catch (err){
        res.status(500).json({message: err.message})
    }
})
//Get one
router.get('/current', getCurrent, (req, res) =>{
    res.json(res.order)
})
router.get('/:id', getOrder, (req, res) =>{
    res.json(res.order)
})

//Create one
router.post('/',  async (req, res) =>{
    const order = new Order({
        allDrinks: [],
        subtotalPrice: 0,
        totalPrice: 0
    })
    try {
        const newOrder = await order.save()
        res.status(201).json(newOrder)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Update One
router.patch('/current', getCurrent,  async(req, res) =>{
    if(req.body.allDrinks != null){
        res.order.allDrinks = req.body.allDrinks
    }

    if(req.body.timePaid != null){
        res.order.timePaid = req.body.timePaid
    }
    if(req.body.subtotalPrice != null){
        res.order.subtotalPrice = req.body.subtotalPrice
        res.order.totalPrice = req.body.subtotalPrice + (req.body.subtotalPrice * .08)
    }
    
    
    try{
        const updatedOrder = await res.order.save()
        res.json(updatedOrder)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
router.patch('/:id', getOrder,  async(req, res) =>{
    if(req.body.allDrinks != null){
        res.order.allDrinks = req.body.allDrinks
    }
    if(req.body.totalPrice != null){
        res.order.totalPrice = req.body.totalPrice
    }
    if(req.body.timePaid != null){
        res.order.timePaid = req.body.timePaid
    }
    if(req.body.subtotalPrice != null){
        res.order.subtotalPrice = req.body.subtotalPrice
    }
    
    
    try{
        const updatedOrder = await res.order.save()
        res.json(updatedOrder)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Delete One
router.delete('/:id', getOrder,  async(req, res) =>{
    try{
        await res.order.deleteOne();
        res.json({message: "Deleted Order"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getOrder(req, res, next){
    let order
    try{
        order = await Order.findById(req.params.id)
        if (order == null){
            return res.status(404).json({message: "Couldn't Find Order"})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.order = order
    next()
}
async function getCurrent(req, res, next){
    let order
    try{
        order = await Order.findById("6667595f24f043d067bccb6c")
        if (order == null){
            return res.status(404).json({message: "Couldn't Find Order"})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.order = order
    next()
}
module.exports = router