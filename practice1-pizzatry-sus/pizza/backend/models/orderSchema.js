const mongoose=require("mongoose")
const orderSchema=new mongoose.Schema({
    orders:[
        {
            id:{type:Number},
            pname:{type:String},
            price:{type:Number},
            image:{type:String},
            quantity:{type:String},
            date:{type:Date,default:Date.now}
            
        },
    ],
    total:{
        type:Number
    },
    cardnum:{
        type:String
    },
    email:{
        type:String
    }
})
const orders=new mongoose.model("orders",orderSchema)
module.exports=orders;