// This will hold all the routes for the /user URl ex ' router.get('/user' )   , router.post('/user')

import express from 'express';
import userModel from '../models/user.js'
import authorizeRole from '../middlewares/roleMiddleware.js'
import { ROLES } from '../config/roles.js';

const router = express.Router();

router.get('/all', async (req, res) => {
   try {
       const users = await userModel.find({});
       if (users.length > 0) {
           res.status(200).json(users);
           console.log('Fetched user list successfully');
       } else {
           res.status(404).json({ message: 'No users found' });
           console.log('No users found');
       }
   } catch (error) {
       console.error('Error occurred while fetching users:', error.message);
       res.status(500).json({ message: 'Internal server error' });
   }
});


router.post('/register', async (req, res) => {
   const { name, email, password, role } = req.body;

   if (!name || !email || !password) {
       return res.status(400).json({ message: 'Name, email, and password are required.' });
   }

   try {
       // Hash the password before saving
       const hashedPassword = await bcrypt.hash(password, 10);

       const newUser = await userModel.create({
           name,
           email,
           password: hashedPassword,
           role,
       });

       res.status(201).json({
           message: 'User registered successfully',
           userId: newUser.userId,
       });

       console.log('User registered successfully with userId:', newUser.userId);
   } catch (error) {
       console.error('Error occurred while registering user:', error.message);
       res.status(500).json({ message: 'Internal server error' });
   }
});

router.put('/update/:userId', async (req, res) => {
   const { userId } = req.params;
   const { name, email, contact, role, password } = req.body;

   try {
       const updateData = {};
       if (name) updateData.name = name;
       if (email) updateData.email = email;
       if (contact) updateData.contact = contact;
       if (role) updateData.role = role;
       if (password) updateData.password = await bcrypt.hash(password, 10);

       const updatedUser = await userModel.findOneAndUpdate({ userId }, updateData, { new: true, runValidators: true });

       if (!updatedUser) {
           return res.status(404).json({ message: 'User not found' });
       }

       res.status(200).json({
           message: 'User updated successfully',
           updatedUser,
       });

       console.log('User updated successfully:', updatedUser.userId);
   } catch (error) {
       console.error('Error occurred while updating user:', error.message);
       res.status(500).json({ message: 'Internal server error' });
   }
});


router.delete('/delete/:userId', async (req, res) => {
   try {
       const { userId } = req.params;
       const deletedUser = await userModel.findOneAndDelete({ userId });

       if (!deletedUser) {
           return res.status(404).json({ message: 'User not found' });
       }

       res.status(200).json({ message: 'User deleted successfully' });
       console.log('User deleted successfully:', userId);
   } catch (error) {
       console.error('Error occurred while deleting user:', error.message);
       res.status(500).json({ message: 'Internal server error' });
   }
});



// Route to manage users (Organization Admin and Super Admin only)
router.post(
    '/manage-users',
    authorizeRole(ROLES.ORGANIZATION_ADMIN),
    async (req, res) => {
      try {
        // Perform user management actions here (e.g., add, remove, update users)
        res.status(200).json({ message: 'User management successful' });
      } catch (error) {
        res.status(500).json({ message: 'Error managing users', error });
      }
    }
  );


export default router;