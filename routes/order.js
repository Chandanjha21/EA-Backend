import express from 'express'
import Order from '../models/order.js'
import multer from 'multer';
import path from 'path';
import xlsx from 'xlsx';
import csvParser from 'csv-parser';
import fs from 'fs';

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        console.log('Received request for all orders');
        // Fetch and sort orders by createdAt in descending order
        const orders = await Order.find({}).sort({ createdAt: -1 });
        
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

router.get('/my-all', async (req, res) => {
    try {
        console.log('Received request for My all orders');

        const page = parseInt(req.query.page) || 1;  // Default to page 1 if not specified
        const limit = parseInt(req.query.limit) || 1000;  // Default to 1000 items per page , cause we wanna decrease the data load.
        const skip = (page - 1) * limit;  // Calculate the number of documents to skip

        // Fetch and sort orders by createdAt in descending order
        const orders = await Order.find({salesman: req.user.name})
                                    .sort({ createdAt: -1 })
                                    .skip(skip)
                                    .limit(limit);

        const totalOrders = await Order.countDocuments({salesman: req.user.name});
        const totalPages = Math.ceil(totalOrders / limit);

        if (orders.length > 0) {
            console.log('My Orders fetched successfully');
            res.status(200).json({
                orders,
                totalOrders,
                totalPages, // Total number of pages
                currentPage: page,
            });
        } else {
            console.log('No My orders found');
            res.status(404).json({ message: 'No My orders found' });
        }
    } catch (error) {
        console.error('Error fetching My orders:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Fetch order by ID in reverse order - the latest one up and older one down
router.get("/:orderId", async (req, res) => {
    const { orderId } = req.params;
  
    try {
        console.log("getting the orderId" , orderId);
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json(order);
    } catch (error) {
      console.error("Error fetching order:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

router.post('/add', async (req, res) => {
    const { salesman, buyer, items, deliveryAddress } = req.body;

    if (!salesman || !buyer || !items  ) {
        return res.status(400).json({ message: 'Salesman, buyer, items, and deliveryAddress are required.' });
    }

    const totalAmount = items.reduce((acc, item) => acc + item.amount, 0);
    const totalQuantity = items.reduce((acc , item) => acc + item.quantity , 0);

    try {
        const newOrder = await Order.create({ salesman, buyer, items , deliveryAddress , totalAmount , totalQuantity });
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
    const { salesman, buyer, items , status , deliveryAddress } = req.body;

    console.log('Updating order:', orderId);

    try {
        const updateData = {};
        if (salesman) updateData.salesman = salesman;
        if (buyer) updateData.buyer = buyer;
        if (items) updateData.items = items;
        if (status) updateData.status = status;
        if (deliveryAddress) updateData.deliveryAddress = deliveryAddress;

        const updatedOrder = await Order.findOneAndUpdate({ _id: orderId }, updateData, { new: true, runValidators: true });

        if (!updatedOrder) {
            console.log("this came " , updatedOrder)
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order updated successfully',
            updatedOrder
        });
        console.log('Order updated successfully:', updatedOrder.orderId);
    } catch (error) {
        console.error('Error occurred while updating order:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }    
});

router.delete('/delete/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const deletedOrder = await Order.findOneAndDelete({ orderId });

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

// //Bulk upload of orders 

// Multer configuration for file uploads
const upload = multer({ dest: "uploads/" });

// Helper function to process data
const processOrders = async (data) => {
    const orders = [];

    data.forEach(row => {
        try {
            // Ensure items is parsed as an array
            let items = typeof row.items === "string" ? JSON.parse(row.items) : row.items;

            if (!Array.isArray(items)) {
                console.log("Skipping invalid row (items is not an array):", row);
                return;
            }

            const order = {
                salesman: row.salesman,
                buyer: row.buyer,
                deliveryAddress: row.deliveryAddress,
                status: row.status || "Created",
                totalAmount: row.totalAmount,
                totalQuantity: row.totalQuantity,
                items: items.map(item => ({
                    name: item.name,
                    size: item.size,
                    quantity: item.quantity,
                    price: item.price,
                    amount: item.amount
                }))
            };

            orders.push(order);
        } catch (error) {
            console.log("Skipping invalid row:", row, error.message);
        }
    });

    if (orders.length === 0) {
        throw new Error("No valid orders found in the file.");
    }

    await Order.insertMany(orders);
    console.log("Orders successfully inserted!");
};

// CSV File Upload Route
router.post("/upload/csv", upload.single("file"), async (req, res) => {
    try {
        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csvParser())
            .on("data", (data) => results.push(data))
            .on("end", async () => {
                const response = await processOrders(results);
                res.json(response);
            });
    } catch (error) {
        res.status(500).json({ success: false, message: "File processing failed" });
    }
});

// Excel File Upload Route
router.post("/upload/excel", upload.single("file"), async (req, res) => {
    try {
        const workbook = xlsx.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = xlsx.utils.sheet_to_json(sheet);

        const response = await processOrders(jsonData);
        res.json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: "File processing failed" });
    }
});

// API to get the orders of a particular user only


export default router;