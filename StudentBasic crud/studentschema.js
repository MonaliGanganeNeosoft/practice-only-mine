const mongoose = require("mongoose")
const studentSchema = new mongoose.Schema({
    StudentId:Number,
    Name:String,
    Roll:Number,
    Address:String
})
module.exports=mongoose.model("student",studentSchema)