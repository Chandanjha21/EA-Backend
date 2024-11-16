// backend/routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');

const router = express.Router();

// const authMiddleware = require('../middlewares/authMiddleware');

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
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        // Prepare payload with user info, role, and organization
        const tokenPayload = {
            id: user._id,
            name: user.name,
            email: user.email,
            organizationId: user.organizationId, // Assuming you store this in the user model
            role: user.role // Assuming roles are stored as strings (e.g., 'admin', 'employee')
        };

        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '30d' });

        res.json({
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

module.exports = router;
