const mongoose = require('mongoose');
const userSchema =  new mongoose.Schema({
    name:{
        type:String
    },
    Age:{
        type:Number
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('User',userSchema);
