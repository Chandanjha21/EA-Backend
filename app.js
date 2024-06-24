const express = require('express')
const app = express();
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/' , {
    dbName: "Saleperson"
})
.then(
    () => {console.log("database connected")}
).catch(
    (e) => {console.log(e)}
)

const userSchema = new mongoose.Schema({
    name : String , 
    email : String,
    role : String ,
})

const userModel = mongoose.model('Users' , userSchema)

app.get('/add' , (req , res) => {
    userModel.create({name: "Chandan" , email: "ckj@gmail.com" , role : "admin"}).then(() => {
        console.log("data succesfully added to userModel");
        res.send("Congrats its added");
    }).catch((e) => {
        console.log(e);
    })
})

app.listen(5000 , () => {
    console.log("Listening at port 5000")
})