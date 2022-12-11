const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    fname:{
        type:String,
    },
    lname:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }

})
const User=new mongoose.model("user",userSchema)
module.exports=User;