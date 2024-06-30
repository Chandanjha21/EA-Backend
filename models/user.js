import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name : String , 
    email : String,
    role : String ,
})

export default userModel = mongoose.model('Users' , userSchema)