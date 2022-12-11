const mongoose=require('mongoose');
const employeeSchema=new mongoose.Schema({
    empName:{
        type:String,
        required:true,
        unique:true
    },
    empEmail:{
        type:String,
        required:true,
        unique:true
    },
    empMobile:{
        type:Number,
        required:true
    },
    empSalary:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    } 
})
module.exports=mongoose.model("display",employeeSchema);