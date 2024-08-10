import mongoose from "mongoose";

const buyerSchema = mongoose.Schema({
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
 const buyerModel = mongoose.model('buyers' , buyerSchema)

 export default buyerModel;