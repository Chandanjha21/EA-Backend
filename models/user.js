import mongoose from "mongoose"
import { v4 as uuidv4 } from 'uuid';


const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: uuidv4, // This ensures the unique id generates for all
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['admin', 'sales man', 'order manager', 'driver', 'user'],
        default: 'user',
    },
    password: {
        type: String,
        required: true,
    },
    // the createdAt and updatedAt are the fields managed by mongoose itself you don't need to do anything
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

}, 
    {
    timestamps: true // This enables both createdAt and updatedAt fields
})

const userModel = mongoose.model('Users', userSchema)

export default userModel;