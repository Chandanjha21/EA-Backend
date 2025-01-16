import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name : String ,
    size : String ,
    quantity : Number ,
    price : Number,
    amount : Number ,
})

//here we will write all the order schema and all
const orderSchema = new mongoose.Schema({
       
    salesman : {
        type : String,
        required : true,
    },
    buyer : {
        type : String , 
        required : true,
    },
    items : {
        type : [itemSchema], //You can actually use this type as well
        required : true,
    },
    deliveryAddress : { 
        type : String,
        required : true,
    },
    status : {
        type: String,
        enum : ['Completed' , 'Shipping' , 'Payment Pending' , 'Delivered' , 'Created'],
        default : 'Created' ,
    },
    createdAt : {
        type : Date , 
        default : Date.now ,
    },
    updatedAt : {
        type : Date, 
        default : Date.now,
    }
} , {
    timestamps : true
})

const Order = mongoose.model('orders' , orderSchema) ;

export default Order;