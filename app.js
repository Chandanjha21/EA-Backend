import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.js'
import orderRouter from './routes/order.js'
import productRouter from './routes/product.js'

const app = express();
app.use( '/user' , userRouter);


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