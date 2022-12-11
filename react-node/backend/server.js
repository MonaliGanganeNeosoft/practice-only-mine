const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const PORT=8899;
const app=express();
 
const db="mongodb://localhost:27017/mongocrud";
const connectDB=async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true});
        console.log("MongoDb Connected");
    }
    catch(err){
        console.log(err.message);
    }
}
connectDB();
 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
//load routes
const postRoutes=require('./routes/postRoutes');
app.use("/api/posts",postRoutes);
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Work on ${PORT}`);
})
 
