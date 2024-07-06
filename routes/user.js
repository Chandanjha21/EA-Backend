// This will hold all the routes for the /user URl ex ' router.get('/user' )   , router.post('/user')

import express from 'express';
import userModel from '../models/user.js'

const router = express.Router();

router.get('/all', (req, res) => { // This route will provide all the users list

})

router.post('/register', (req, res) => {
   const { name, email, password, role } = req.body;

   userModel.create({ name, email, password, role })
      .then(
         (user) => {
            console.log('user registerd successfully with userId : ', user.userId)
            res.status(201).json("success")
         }
      ).catch(e => console.log('error occured while registering :', e))
})

router.put('/update/:userId', (req, res) => {
   const { userId } = req.params;
   const { name, email, contact, role, password } = req.body;


})

router.delete('/delete/:userId', async (req, res) => {
   try {
      const { userId } = req.params;
      const deletedUser = await userModel.findOneAndDelete({ userId });

      if (!deletedUser) {
         return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });

   } catch (error) {
      res.status(400).json({ error: error.message });
      console.log('error occure while deleting' , error.message)
   }
})

export default router;