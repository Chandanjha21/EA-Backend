import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
    size : {
        type : Number ,
        required : true,
    },
    price : {
        type : Number , 
        required : true ,
    }
})

const productSchema = new mongoose.Schema({
    name : {type : String , required : true},
    sizes : [sizeSchema],
})

const productModel = mongoose.model('products' , productSchema)

export default productModel;