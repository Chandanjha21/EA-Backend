import express from 'express';
import mongoose from 'mongoose';
import userModel  from './models/user';

const app = express();



mongoose.connect('mongodb://localhost:27017/' , {
    dbName: "Saleperson"
})
.then(
    () => {console.log("database connected")}
).catch(
    (e) => {console.log(e)}
)



app.get('/add' , (req , res) => {
    
    const {name , email , role} = req.query ;
    userModel.create({
        name  , email , role 
    })
    .then(() => {
        console.log("data succesfully added to userModel");
        res.send("Congrats its added");
    }).catch((e) => {
        console.log(e);
    })
})

app.listen(5000 , () => {
    console.log("Listening at port 5000")
})