const mongoose = require('mongoose')

const drinksSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    order:{
        type: Number,
        require: true
    },
    color:{
        type: String,
        require: true
    },
    type:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Drinks', drinksSchema)