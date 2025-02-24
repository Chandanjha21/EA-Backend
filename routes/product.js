import express from 'express'
import Product from '../models/product.js'
import mongoose from 'mongoose';

const router = express.Router();

router.get('/all', async (req, res) => {
    // To get the list of all products with variants in JSON format
    try {
        const products = await Product.find({});

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

// Update product prices (bulk update)
router.put("/update-prices", async (req, res) => {
    console.log("Received update request:", req.body); // ✅ Log the full request body
  
    try {
      const { updates } = req.body;
  
      if (!Array.isArray(updates) || updates.length === 0) {
        console.log("❌ Invalid update format:", updates);
        return res.status(400).json({ message: "Invalid update data" });
      }
  
      const bulkOperations = updates.map(({ productId, sizeId, price }) => {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
          console.log(`❌ Invalid ObjectId: ${productId}`);
          return null;
        }
  
        return {
          updateOne: {
            filter: { _id: new mongoose.Types.ObjectId(productId), "sizes.size": sizeId },
            update: { $set: { "sizes.$.price": price } },
          },
        };
      }).filter(Boolean); // Remove null values
  
      if (bulkOperations.length === 0) {
        console.log("❌ No valid updates to process.");
        return res.status(400).json({ message: "No valid updates to process." });
      }
  
      const result = await Product.bulkWrite(bulkOperations);
      console.log("✅ Prices updated successfully:", result);
      res.json({ message: "Prices updated successfully", result });
    } catch (error) {
      console.error("🔥 Error updating prices:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  });
  
router.put('/:id' , async(req , res) => {
    //to update products
    const id = req.params.id ;
    const updateData = req.body ;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

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

router.post('/add', async (req, res) => {
    // To add a new product
    const { name, sizes } = req.body;

    if (!name || !sizes) {
        return res.status(400).json({ message: 'Missing required fields: name, id, and sizes are required.' });
    }

    try {
        // Create and save the new product
        const newProduct = await Product.create({ name, sizes });
        // Respond with success message and product ID
        res.status(201).json({ message: 'Product added successfully', productId: newProduct._id });
        console.log('Product added with ID:', newProduct._id);
    } catch (error) {
        // Handle any errors that occur
        console.error('Error occurred while adding product:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    // to remove a product
    const id = req.params.id;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
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
