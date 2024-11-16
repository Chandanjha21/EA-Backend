import mongoose from "mongoose"
import { v4 as uuidv4 } from 'uuid';


const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: uuidv4, // This ensures the unique id generates for all
        unique: true,
    },
    organizationId: {
        type: String,
        required: true,
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
    contact: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{10,14}$/,  // Example regex for 10 to 14 digit numbers
    },
    role: {
        type: String,
        enum: ['admin', 'salesman', 'ordermanager', 'driver', 'user' , 'accountant'],
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

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();  // Step 1 // these steps check that the password have been changed recently or not
    const salt = await bcrypt.genSalt(10);            // Step 2 // so that to hash back and then save else remain same
    this.password = await bcrypt.hash(this.password, salt); // Step 3
    next();                                           // Step 4
});

const userModel = mongoose.model('Users', userSchema)


export default userModel;