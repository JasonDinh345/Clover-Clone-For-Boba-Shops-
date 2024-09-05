const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    allDrinks: [{
        name: { type: String, required: true },
        drinkPrice: { type: Number, required: true },
        toppings:[{
            name: { type: String, required: true },
            amount: { type: Number, required: true }
        }],
        totalPrice:{ type: Number, required: true },
        toppingPrice:{ type: Number, required: true },
        iceLevel: { type: String, required: true },
        sugarLevel: { type: String, required: true },
        drinkID:{ type: String, required: true }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    subtotalPrice:{
        type: Number,
        required: true
    },
    timeCreated: { type: String, required: true, default: Date.now },
    timePaid:{ type: String, required: true, default: "Incomplete"}
});

module.exports = mongoose.model('Order', orderSchema)