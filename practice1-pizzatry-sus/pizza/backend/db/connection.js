const mongoose=require('mongoose')
const db="mongodb://localhost:27017/UserSignup";

const connectDB=async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true})
        console.log("mongodb connected")
    }
    catch(err){
        console.log("err msg")
    }
}
module.exports=connectDB()