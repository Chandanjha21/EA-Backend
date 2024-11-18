//This file will hold all the functions gonna used by the / user and make sure to export them
// controllers/userController.js

import User from "../models/user";
// Add User function
const addUser = async (req, res) => {
  try {
    const { email, name, role } = req.body;
    const newUser = new User({ email, name, role });

    await newUser.save();
    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error });
  }
};

// Delete User function
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

module.exports = { addUser, deleteUser };
