const express=require("express");
const mongoose=require("mongoose");
const PORT=8899
const app=express();
app.use(express.urlencoded({extended:false}));
app.use(express.json())
//db connection
const db="mongodb://localhost:27017/mongocrudMoni";
const connectDB=async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true});
        console.log("Mongodb connected")
    }
        catch(err){
            console.log(err.message)
        }
}
connectDB();
const catModel=require('./db/categorySchema');
//create
app.get("/insert",(req,res)=>{
    let name=req.body.name;
    console.log(name)
    let image=req.body.image;
    console.log(image)
    let ins=new catModel({name,image});
    console.log(name)
    console.log(image)
    ins.save((err)=>{
        if(err){res.send("Already added")}
        else{
            res.send("category Added");
        }
    })

})
//fetch(display)
app.get("/getc",(req,res)=>{
    catModel.find({},(err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})
//delete with help of id
app.delete("/deletec/:id",(req,res)=>{
    let id=req.params.id;
    catModel.deleteOne({_id:id},(err)=>{
        if(err)throw err
        res.send("category deleted")
    })
})
//update 
app.put("/updatecategory/:id",(req,res)=>{
    let id=req.params.id;
    console.log(id)
    catModel.updateOne({_id:id},{$set:{name:"shreyu",image:"shr1.jpg"}},(err)=>{
        if(err) throw err;
        else {
            res.end("Category Updated");
            
        }
    })
})


app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Work on ${PORT}`)
})
