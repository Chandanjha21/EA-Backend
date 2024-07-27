import express from 'express'
import productModel from '../models/product.js'

const router = express.Router();

router.get('/all', async (req, res) => {
    // To get the list of all products with variants in JSON format
    try {
        const products = await productModel.find({});

        if (products.length > 0) {
            res.status(200).json(products);
            console.log('Fetched product list successfully');
        } else {
            res.status(404).json({ message: 'No products found' });
            console.log('No products found');
        }
    } catch (error) {
        console.error('Error occurred while fetching products:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id' , async(req , res) => {
    //to update products
    const id = req.params.id ;
    const updateData = req.body ;
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (updatedProduct) {
            res.status(200).json({ message: 'Product updated successfully', updatedProduct });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.log('Error occurred while Updating', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post('/add' , async(req , res) => {
    //to add new product
    const {name , id , sizes} = req.body ;
    try {
        await productModel.create({name , id , sizes})
        .then(
            (product) => {console.log('product added with id :' , product._id)}
        )
    } catch (error) {
        console.log('eror occured while adding' , error.message)
    }
})

router.delete('/:id', async (req, res) => {
    // to remove a product
    const id = req.params.id;
    try {
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (deletedProduct) {
            res.status(200).json({ message: 'Product deleted successfully', productName: deletedProduct.name });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.log('Error occurred while deleting', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default router ;
