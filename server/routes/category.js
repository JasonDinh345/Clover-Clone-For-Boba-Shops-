const express = require('express')
const router = express.Router()
const Category = require('../models/category')
//Get All
router.get('/',  async(req, res) =>{
    try{
        const categories = await Category.find()
        res.json(categories)
    }catch (err){
        res.status(500).json({message: err.message})
    }
})
//Get one
router.get('/:id', getCategory, (req, res) =>{
    res.json(res.category)
})
//Create one
router.post('/',  async (req, res) =>{
    const category = new Category({
        name: req.body.name,
        color: req.body.color
    })
    try {
        const newCategory = await category.save()
        res.status(201).json(newCategory)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Update One
router.patch('/:id', getCategory,  async(req, res) =>{
    if(req.body.name != null){
        res.category.name = req.body.name
    }
    if(req.body.color != null){
        res.category.color = req.body.color
    }
    
    try{
        const updatedCategory = await res.category.save()
        res.json(updatedCategory)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Delete One
router.delete('/:id', getCategory,  async(req, res) =>{
    try{
        await res.category.deleteOne();
        res.json({message: "Deleted Category"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getCategory(req, res, next){
    let category
    try{
        category = await Category.findById(req.params.id)
        if (category == null){
            return res.status(404).json({message: "Couldn't Find Category"})
        }
    }catch(err){
        return res.status(500).json({message: err.messege})
    }
    res.category = category
    next()
}
module.exports = router