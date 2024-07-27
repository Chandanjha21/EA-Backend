import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.js'
import orderRouter from './routes/order.js'
import productRouter from './routes/product.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( '/api/users' , userRouter);
app.use( '/api/orders' , orderRouter);
app.use('/api/products' , productRouter);

app.get('/' , (req, res) => {
    res.send('Home')
})

mongoose.connect('mongodb://localhost:27017/' , {
    dbName: "Saleperson"
})
.then(
    () => {console.log("database connected")}
).catch(
    (e) => {console.log(e)}
)




app.listen(5000 , () => {
    console.log("Listening at port 5000")
})