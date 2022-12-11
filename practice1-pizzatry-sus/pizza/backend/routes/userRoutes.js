const express=require('express');
const router=express.Router();
const userModel=require('./../models/userSchema')
const jwt=require("jsonwebtoken");
const jwtSECRET="JKHJKHJKHJKHJKLM";
const pizzaModel=require("../models/pizzaSchema")
const orderModel=require("./../models/orderSchema")


// function AuthenticateToken(req,res,next){
//     const authHeader=req.headers["authorization"];
//     const token = authHeader && authHeader.split("")[1];
//     if(token == null){
//         res.json({err:1,msg:"Token is not matched"});
//     }
//     else{
//         jwt.verify(token,jwtSECRET,(err,data)=>{
//             if(err){
//                 res.json({err:1,msg:"Token incorrect"});
//             }else{
//                 next();
//             }
//         })
//     }
// }


router.get('/demo',(req,res)=>{
    console.log("user post")
    res.send("get  user")
})

router.post("/signup",(req,res)=>{
    console.log("sign up")
    console.log(req.body)
    let fname=req.body.fname;
    let lname=req.body.lname;
    let email=req.body.email;
    let password=req.body.password;
    let ins=new userModel({
        fname:fname,
        lname:lname,
        email:email,
        password,password,
    })
    ins.save((err)=>{
        if(err){
            // res.send("already added"+err.message)
            res.send("already added this email")
        }else{
            res.send("user is added")
        }
    })
    console.log(req.body)

})

router.post("/login",(req,res)=>{
    console.log(req.body);
    let email=req.body.email;
    let password=req.body.password;
    userModel.findOne({email:email,password:password},(err,data)=>{
        if(err){
            res.json({err:1,msg:"email or password is incorrect"})
        }else if(data==null){
            res.json({err:1,msg:"incorrect email"})
        }else{
            let payload={
                uid:email,
            };
            const token=jwt.sign(payload,jwtSECRET,{expiresIn:360000});
            res.json({err:0,msg:"login successful",token:token})
        }
    })
})

router.get("/user",(req,res)=>{
    console.log(req.body)
    userModel.find({},(err,data)=>{
        if (err) throw err;
        else{
            res.json({err:0,data:data})
        }
    })
})


//single user for profile
router.get("/user/:email",(req,res)=>{
    console.log(req.body)
    const email=req.params.email;
    userModel.findOne({email},(err,data)=>{
        if(err) throw err;
        else{
            res.json({err:0,data:data})
        }
    })
})

//Update Profile
router.put("/updateuser/:id",(req,res)=>{
    console.log(req.body);
    let id = req.params.id;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let password = req.body.password;
    userModel.updateOne({_id:id},{$set:{fname,lname,email,password},},(err)=>{
        if(err)throw err;
        else{
            res.send("user updated")
        }
    }) 
})

//Delete user profile
router.delete("/deleteuser/:id",(req,res)=>{
    const id = req.params.id;
    userModel.deleteOne({_id:id},(err)=>{
        if(err)throw err;
        else{
            res.send("user deleted")
        }
    });
});


//get pizza data
router.get("/pizzadata",(req,res)=>{
    console.log(req.body)
    pizzaModel.find({},(err,data)=>{
        if(err){
            res.json({err:1,msg:"not found"})
        }else{
            res.json({err:0,data:data})
        }
    })
})
router.post("/pizzacreate",(req,res)=>{
    console.log(req.body);
    let id=req.body.id;
    let pname=req.body.pname;
    let price=req.body.price;
    let image=req.body.image;
    let insp=new pizzaModel({id:id,pname:pname,price:price,image:image})
    insp.save((err)=>{
        if(err){
            res.send("already added id")
        }
        else{
            res.send("pizza added")
        }
    })
})
//checkout
router.post("/checkout",(req,res)=>{
    console.log(req.body)
    let cart=req.body.cart;
    let total=req.body.total;
    let cardnum=req.body.cardnum;
    let email=req.body.uid;
    let insc=new orderModel({orders:cart,total:total,cardnum:cardnum,email:email})//Orders is imporatant to render data frontside
    insc.save((err)=>{
        if(err){
            res.json({err:1,msg:"already added"})
        }else{
            res.json({err:0,msg:"added"})
        }
    })
})
//get order
router.get("/getorders",(req,res)=>{
    console.log(req.body);
    orderModel.find({},(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json({err:0,data:data})
        }
    })
})
module.exports=router;