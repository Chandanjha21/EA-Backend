import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    name: {
        type : String,
        required : true ,
    },
    Address: {
        type : String,
        required : true ,
    },
    contact: {
        type : String,
        required : true ,
    },
    gstNumber: {
        type : String,
        required : true ,
    },
    status : {
        type : Boolean,
    },
    coordinates : {
        type : String ,
    },
    storeAddress : {
        type : String,
    },
    createdBy : {
        type : String, // Salesman name who is related to the party
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
 const customerModel = mongoose.model('buyers' , customerSchema)

 export default customerModel;