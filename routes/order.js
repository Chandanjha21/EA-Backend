import express from 'express'
import Order from '../models/order.js'

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
    const { salesman, buyer, items, orderId } = req.body;

    if (!salesman || !buyer || !items  ) {
        return res.status(400).json({ message: 'Salesman, buyer, items, and orderId are required.' });
    }

    try {
        const newOrder = await Order.create({ salesman, buyer, items });
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

        const updatedOrder = await Order.findOneAndUpdate({ orderId }, updateData, { new: true, runValidators: true });

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


export default router;