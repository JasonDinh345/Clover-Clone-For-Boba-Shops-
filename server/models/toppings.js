const mongoose = require('mongoose')

const toppingsSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Toppings', toppingsSchema)