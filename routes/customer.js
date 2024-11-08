import express from 'express'
import customerModel from '../models/customer.js'

const router = express.Router();

router.get('/all', async (req, res) => {
    // To get the list of all customers with variants in JSON format
    try {
        const customers = await customerModel.find({});

        if (customers.length > 0) {
            res.status(200).json(customers);
            console.log('Fetched customer list successfully');
        } else {
            res.status(404).json({ message: 'No customers found' });
            console.log('No customers found');
        }
    } catch (error) {
        console.error('Error occurred while fetching customers:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id' , async(req , res) => {
    //to update customers
    const id = req.params.id ;
    const updateData = req.body ;
    try {
        const updatedcustomer = await customerModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (updatedcustomer) {
            res.status(200).json({ message: 'customer updated successfully', updatedcustomer });
        } else {
            res.status(404).json({ message: 'customer not found' });
        }
    } catch (error) {
        console.log('Error occurred while Updating', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post('/add', async (req, res) => {
    // To add a new customer
    const { name, email , address , gstNumber , contact , status , storeAddress } = req.body;

    if (!name ) {
        return res.status(400).json({ message: 'Missing required fields: name, id, and sizes are required.' });
    }

    try {
        // Create and save the new customer
        const newcustomer = await customerModel.create({ name, email , address , gstNumber , contact , status , storeAddress});
        // Respond with success message and customer ID
        res.status(201).json({ message: 'customer added successfully', customerId: newcustomer._id });
        console.log('customer added with ID:', newcustomer._id);
    } catch (error) {
        // Handle any errors that occur
        console.error('Error occurred while adding customer:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    // to remove a customer
    const id = req.params.id;
    try {
        const deletedcustomer = await customerModel.findByIdAndDelete(id);
        if (deletedcustomer) {
            res.status(200).json({ message: 'customer deleted successfully', customerName: deletedcustomer.name });
        } else {
            res.status(404).json({ message: 'customer not found' });
        }
    } catch (error) {
        console.log('Error occurred while deleting', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default router ;
