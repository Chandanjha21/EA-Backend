import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.js'

const app = express();
app.use(userRouter);


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