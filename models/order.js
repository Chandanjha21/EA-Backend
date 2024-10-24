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

    // IF not sure about the type you can also use mongoose.Schema.Types.Mixed

    // orderId : { //Considering order Id and Bill number will be same
    //     type : Number, 
    //     required : true,
    // },
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

const orderModel = mongoose.model('orders' , orderSchema) ;

export default orderModel;