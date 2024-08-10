//This will hold the connection to the databse in a method that you will export
import mongoose from 'mongoose';

// Define your MongoDB connection URL. You can replace this with your own.
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name';

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Connect to the MongoDB database
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,       // Use the new URL parser
        });

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process with failure code
    }
};

// Export the connection function
export default connectDB;
