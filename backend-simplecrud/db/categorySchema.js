const mongoose=require("mongoose");
const catSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("catMonicrud",catSchema);