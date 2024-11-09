import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    name: {
        type : String,
        required : true ,
    },
    address: {
        type : String,
        required : true ,
    },
    contact: {
        type : String,
        required : true ,
    },
    salesmanName: {
        type : String ,
        required : true ,
    },
    gstNumber: {
        type : String,
        required : true ,
    },
    status : {
        type : String,
    },
    coordinates : {
        type : String ,
    },
    storeAddress : {
        type : String,
    },
    otherAddress : {
        type : String,
    },
    createdBy : {
        type : String, // Salesman name who is related to the party
    },
    creditBalance: {
        type : Number , // This is to record the cashback or refund transactions or advance
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
})
 const customerModel = mongoose.model( 'customers' , customerSchema)

 export default customerModel;