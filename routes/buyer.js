import express from 'express'
import orderModel from '../models/order.js'

const router = express.Router();

router.get('/all', async (req, res) => {
    // To get the list of all orders with variants in JSON format
    try {
        const orders = await orderModel.find({});

        if (orders.length > 0) {
            res.status(200).json(orders);
            console.log('Fetched order list successfully');
        } else {
            res.status(404).json({ message: 'No orders found' });
            console.log('No orders found');
        }
    } catch (error) {
        console.error('Error occurred while fetching orders:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id' , async(req , res) => {
    //to update orders
    const id = req.params.id ;
    const updateData = req.body ;
    try {
        const updatedorder = await orderModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (updatedorder) {
            res.status(200).json({ message: 'order updated successfully', updatedorder });
        } else {
            res.status(404).json({ message: 'order not found' });
        }
    } catch (error) {
        console.log('Error occurred while Updating', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post('/add', async (req, res) => {
    // To add a new order
    const { name, sizes } = req.body;

    if (!name || !sizes) {
        return res.status(400).json({ message: 'Missing required fields: name, id, and sizes are required.' });
    }

    try {
        // Create and save the new order
        const neworder = await orderModel.create({ name, sizes });
        // Respond with success message and order ID
        res.status(201).json({ message: 'order added successfully', orderId: neworder._id });
        console.log('order added with ID:', neworder._id);
    } catch (error) {
        // Handle any errors that occur
        console.error('Error occurred while adding order:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    // to remove a order
    const id = req.params.id;
    try {
        const deletedorder = await orderModel.findByIdAndDelete(id);
        if (deletedorder) {
            res.status(200).json({ message: 'order deleted successfully', orderName: deletedorder.name });
        } else {
            res.status(404).json({ message: 'order not found' });
        }
    } catch (error) {
        console.log('Error occurred while deleting', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default router ;
