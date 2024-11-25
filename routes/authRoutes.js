// backend/routes/authRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';  // Include the .js extension
// import { JWT_SECRET } from 'dotenv' ; // Include the .js extension
import { getUserByEmail } from '../firebase/firestore.js';

const router = express.Router();
// Access JWT_SECRET from process.env
const JWT_SECRET = process.env.JWT_SECRET;


// const authMiddleware = require('../middlewares/authMiddleware');
router.post('/test', (req, res) => {
    console.log('Test route hit:', req.body);
    res.json({ message: 'Received', body: req.body });
});

router.get('/get-user', async (req, res) => {
    const { email } = req.query; // Example: /get-user?email=test@example.com
    console.log("Received request to fetch user by email:", email);
  
    try {
      const user = await getUserByEmail(email);
  
      if (!user) {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res.status(200).send(user);
      }
    } catch (error) {
      console.error("Error in /get-user route:", error);
      res.status(500).send({ error: 'Failed to fetch user.' });
    }
  });

router.get('/me', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];  // Get the token from headers
        const decoded = jwt.verify(token, secretKey);            // Verify and decode the token

        // Return user data directly from the token payload
        res.json({
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            organizationId: decoded.organizationId,
            role: decoded.role
        });
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });       // Handle invalid token
    }
});


// Login Route
router.post('/login', async (req, res) => {
    console.log("Login route hit with data:", req.body);
    const { email, password } = req.body;
    try {
        console.log("Request payload:", req.body);
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        console.log("Query result:", user);
        console.log("the user fouwnd with password" , user.password)

        // const isPasswordValid = await bcrypt.compare(password, user.password);
        // if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        // For testing purposes only - directly check password
        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Prepare payload with user info, role, and organization
        const tokenPayload = {
            id: user._id,
            name: user.name,
            email: user.email,
            organizationId: user.organizationId, // Assuming you store this in the user model
            role: user.role // Assuming roles are stored as strings (e.g., 'admin', 'employee')
        };

        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({
            token, user: {
                id: user._id,
                name: user.name,
                email: user.email,
                organizationId: user.organizationId,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
