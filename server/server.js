const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const path = require('path');


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection;

db.on('error', (error)  => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

app.use("/public", express.static(process.env.PUBLIC_FILEPATH, + '/public'));
app.use('/src', express.static(path.join(process.env.PUBLIC_FILEPATH, 'src')));

app.get('/', (req, res) =>{
    res.sendFile(path.join(process.env.PUBLIC_FILEPATH, 'public', 'index.html'));
})


const orderRouter = require('./routes/order')
app.use('/order', orderRouter)

const toppingsRouter = require('./routes/toppings')
app.use('/toppings', toppingsRouter)

const categoryRouter = require('./routes/category')
app.use('/category', categoryRouter)

const drinkRouter = require('./routes/drinks')
app.use('/drinks', drinkRouter)

app.listen(3000, () =>{
    console.log("Server Started")
})