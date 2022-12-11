const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const jwtSecret="asdasdasdasdasd";
const loginModel=require('../db/loginSchema')
function autenticateToken(req,res,next){
    const authHeader=req.headers['Authorization'];
    const token=authHeader && authHeader.split(' ');
    if(token==null){
        res.json({"err":1,"msg":"Token not match"})
    }
    else{
        jwt.verify(token,jwtSecret,(err,data)=>{
            if(err){
                res.json({"err":1,"msg":"Token incorrect"})
 
            }
            else {
                // console.log("match")
                next()
            }
        })
    }
 
}
router.get("/fetchpost",autenticateToken,(req,res)=>{
    //read data from post.json file
     let data=[
         {"id":1,"pname":"A","description":"bla bla bla"},
         {"id":2,"pname":"B","description":"bla bla bla"},
         {"id":3,"pname":"C","description":"bla bla bla"},
         {"id":4,"pname":"D","description":"bla bla bla"}
     ];
    //res.send("Fetch Post Call");
    res.json({"err":0,'pdata':data})
})
router.post("/addpost",(req,res)=>{
    let pname=req.body.pname;
    let description=req.body.description;
    //store data or append data in post.json
    res.json({"err":0,"msg":"Post Save"});
})
router.post("/regis",(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    let name=req.body.name;
    let age=req.body.age;
    //store data or append data in post.json
    // res.json({"err":0,"msg":`${email}`});
    let ins=new loginModel({email:email,password:password,name:name,age:age});
    ins.save((err)=>{
        if(err){
            res.json({"err":1,'msg':'Not Registered'})
        }
        else{
            res.json({"err":0,'msg':'Registered'})
        }
    })
})
router.post("/login",(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    loginModel.findOne({email:email,password:password},(err,data)=>{
        if(err){
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else if(data==null)
        {
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else{
            let payload={
                uid:email
            }
            const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
            res.json({"err":0,"msg":"Login success","token":token})
        }
    })
})
module.exports=router;
 
