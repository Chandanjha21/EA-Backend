import express from 'express'
import orderModel from '../models/order.js'

const router = express.Router();

router.get('/all' , (req , res) => {
    res.send ('Here we are supposed to show list of all orders')
})

router.post('/add' , (req  , res) => {
    const {salesman , buyer , items , orderId } = req.body;

    console.log('items' , items);
    orderModel.create({salesman , buyer , items , orderId})
    .then(
        console.log(`order created succesfully with orderId : ${orderId}`)
    ).catch(
        (e) => console.log('error ocured while creating order' , e)
    )
})