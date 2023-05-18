require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/user');

const app = express();

const PORT= process.env.PORT || 4000

mongoose.set('strictQuery', false); 
const DB = process.env.DATABASE || 'mongodb://localhost:27017/Assignment'
console.log(DB);

app.use(cors());
app.use(express.json());

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=> console.log("DataBase Connected")).catch((err)=>{
    console.log(err);
}) 

//routes
app.get('/',(req,res)=>{
    res.status(200).json({result:'server is working'})
})

app.get('/profile',async (req,res)=>{
    try{
        const userDoc = await User.find().sort({_id:-1}).limit(1)
          res.json(userDoc[0].name);
        
    }catch(e){
        res.status(400).json(e);
    }
})

app.post('/',async (req,res)=>{
    const {name,email}=req.body
    console.log(name,email);
    try{
        const userDoc = await User.create({name,email}); 
          res.json(userDoc);
        
    }catch(e){
        console.log(e);
        res.status(400).json(e);
    }
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
 