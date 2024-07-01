// This will hold all the routes for the /user URl ex ' router.get('/user' )   , router.post('/user')

import express from 'express';
import userModel from '../models/user.js'

const router = express.Router();

router.get('/all' , (req , res) => { // This route will provide all the users list

})

router.post('/register' , (req , res) => {
     const {name , email , password , role} = req.body;

     userModel.create({name , email , password , role})
     .then(
        console.log('user registerd successfully')
     ).catch(e => console.log('error occured while registering :' , e))
})

export default router ;