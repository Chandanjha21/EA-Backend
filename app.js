import express from 'express';
import dotenv from 'dotenv';
import connectDB from './data/database.js'; // Adjust the path as necessary
import userRouter from './routes/user.js';
import orderRouter from './routes/order.js';
import productRouter from './routes/product.js';
import customerRouter from './routes/customer.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors'

// Load environment variables from .env file
dotenv.config({ path: './data/config.env' });  // Specify the path to the .env file

// Now you can access the variables from the .env file
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter);
app.use('/api/customers', customerRouter );
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Home');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
