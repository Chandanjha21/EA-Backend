import express from 'express'
import orderModel from '../models/order.js'
import mongoose from 'mongoose';

const router = express.Router();

router.get('/all' , async(req , res) => {
    try {
        console.log('Received request for all orders');
        const products = await orderModel.find({});
        console.log('Orders fetched successfully');
        res.status(200).send(products);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Internal Server Error');
    }
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

router.put('/update/:id' , (req , res) => {

})

router.delete('/delete/:id' , (req , res) => {

})

export default router;