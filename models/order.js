import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
    {
        salesman: { type: String, required: true },
        buyer: { type: String, required: true },
        items: { type: [itemSchema], required: true },
        deliveryAddress: { type: String, required: true },
        status: {
            type: String,
            enum: ['Completed', 'Shipping', 'Payment Pending', 'Delivered', 'Created'],
            default: 'Created',
        },
        totalAmount: { type: Number, required: true },
        totalQuantity: { type: Number, required: true },
    },
    { timestamps: true }
);

const Order = mongoose.model('orders' , orderSchema) ;

export default Order;