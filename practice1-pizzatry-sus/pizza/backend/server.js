const express=require('express')
const app=express();
const port=8888;
const cors=require('cors');

require("./db/connection")
const userRoutes=require("./routes/userRoutes")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(userRoutes)

app.get('/',(req,res)=>{
    console.log("hello moni")
    res.send("hello browser")
})
app.listen(port,(req,res)=>{
    console.log("connection good")
})