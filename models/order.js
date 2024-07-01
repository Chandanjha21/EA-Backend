import mongoose from "mongoose";

//here we will write all the order schema and all
const orderSchema = new mongoose.Schema({
    createdAt : {
        type : Date , 
        default : now ,
    },
    updatedAt : {
        type : Date, 
        default : Date.now,
    }
} , {
    timestamps : true
})

const orderModel = mongoose.model('orders' , orderSchema);

export default orderModel;