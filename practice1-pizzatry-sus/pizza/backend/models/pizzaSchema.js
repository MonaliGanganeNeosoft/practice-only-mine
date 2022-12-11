const mongoose=require('mongoose');
const pizzaSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true,
    },
    pname:{
        type:String,
    },
    price:{
        type:Number,
    },
    image:{
        type:String,
    }
})
const pizza=new mongoose.model("pizza",pizzaSchema);
module.exports=pizza;