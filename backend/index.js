const express=require('express')
const {port,mongodbURL} =require('./config.js')
const mongoose=require('mongoose')
const {Note} =require('./models/notemodel.js')
const  notesroute =require('./routes/notesroute.js')
const cors=require('cors')
const app=express();
const connectdb=require('./db/connect.js')
require('dotenv').config()
// const {mongodbURL}=require('./config.js}')

// const allowedOrigins = [
//     'http://localhost:3000',
//     'https://66597fae3975c9ef0dea3b09--flourishing-cat-b6127f.netlify.app'
//   ];
app.use(cors({ origin: 'https://66597fae3975c9ef0dea3b09--flourishing-cat-b6127f.netlify.app' })); // Replace with the actual origin of your frontend

app.use(express.json())

app.use('/api/v1/notes',notesroute)


app.get('/',(req,res)=>{
    res.status(200).send("hello home")
})





const start=async()=>{
    try{
        await connectdb(process.env.MONGO_URI);
        app.listen(5500,()=>{
                 console.log("listening to port 5500");
             })
    }
    catch(err){
        console.log(err)
    }
}

start();