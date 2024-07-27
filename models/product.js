import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
    size : {
        type : Number ,
        required : true,
    },
    price : {
        type : Number , 
        required : true ,
    },
    updatedAt: {
        type: Date,
        default: Date.now 
    },
})

const productSchema = new mongoose.Schema({
    name : {type : String , required : true},
    // id : {type : Number }, cause _id is gonna generate automatically and we will only use that
    sizes : [sizeSchema],
})

const productModel = mongoose.model('products' , productSchema)

export default productModel;