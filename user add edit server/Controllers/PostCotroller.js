const User = require('../Models/userModel')

async function addUSers(data){
    let ins = await new User(data);
    ins.save((err)=>{
        if (err){
            console.log(err);
        };
    })
}

// update the user Data

async function editUser(req,res){
    console.log(req.params.id);
    let userToUpdate = await User.findById(req.params.id);
    if(!userToUpdate){
        return res.status(500).json({
            sucess:false,
            message:"User not found"
        })
    }
    userToUpdate = await User.updateOne({_id:userToUpdate},req.body,{
        userToUpdate
    });

    res.status(200).json({
        success:true,
        userToUpdate
    })
    // let updateUser =  await User.updateOne({_id:userToUpdate},req.body)
}

module.exports = {addUSers,editUser}