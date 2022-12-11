const mongoose = require('mongoose');
const loginSchema=new mongoose.Schema({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    age:{type:Number,required:true}
})
module.exports=mongoose.model("login",loginSchema);
