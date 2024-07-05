import express from 'express'
import productModel from '../models/product'

const router = express.Router();

router.get('/all' , (req , res) => {
    //to get the lsit of all products with variants in json format
})

router.put('/update' , (req , res) => {
    //to update products
})

router.post('/add' , (req , res) => {
    //to add new product
})

router.delete('/delete' , (req , res) => {
    //to remove a product
})

