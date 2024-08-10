import express from 'express'
import orderModel from '../models/order.js'
import mongoose from 'mongoose';

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        console.log('Received request for all orders');
        const orders = await orderModel.find({});
        if (orders.length > 0) {
            console.log('Orders fetched successfully');
            res.status(200).json(orders);
        } else {
            console.log('No orders found');
            res.status(404).json({ message: 'No orders found' });
        }
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/add', async (req, res) => {
    const { salesman, buyer, items, orderId } = req.body;

    if (!salesman || !buyer || !items  ) {
        return res.status(400).json({ message: 'Salesman, buyer, items, and orderId are required.' });
    }

    try {
        const newOrder = await orderModel.create({ salesman, buyer, items });
        // console.log(`Order created successfully with orderId: ${newOrder.orderId}`);
        res.status(201).json({
            message: 'Order created successfully',
            orderId: newOrder.orderId
        });
    } catch (error) {
        console.error('Error occurred while creating order:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/update/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { salesman, buyer, items } = req.body;

    try {
        const updateData = {};
        if (salesman) updateData.salesman = salesman;
        if (buyer) updateData.buyer = buyer;
        if (items) updateData.items = items;

        const updatedOrder = await orderModel.findOneAndUpdate({ orderId }, updateData, { new: true, runValidators: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order updated successfully',
            updatedOrder
        });
        console.log('Order updated successfully:', updatedOrder.orderId);
    } catch (error) {
        console.error('Error occurred while updating order:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/delete/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const deletedOrder = await orderModel.findOneAndDelete({ orderId });

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
        console.log('Order deleted successfully:', orderId);
    } catch (error) {
        console.error('Error occurred while deleting order:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


export default router;