// backend/middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');


// const authMiddleware = async (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         const user = await User.findById(decoded.id).select('-password');
//         if (!user) return res.status(404).json({ message: 'User not found' });
        
//         req.user = user;  // Attach user to request
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };

// module.exports = authMiddleware;
