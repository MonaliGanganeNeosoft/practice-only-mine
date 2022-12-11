const express = require('express');
const router= new express.Router();
const MenRanking= require("../models/mens.model")

router.get("/",async(req,res)=>{
    res.send("hello from moni")
})
// //we will handle post req =>by hard coding and infinte loop when send request
// router.post("/mens",(req,res)=>{
//     try{
//         const addingMensRecords=new MenRanking({
//             "ranking":2,
//             "name":"goni",
//             "dob":"03 MAR 1996",
//             "country":"USAA",
//             "score":"2347"
//         })
//         addingMensRecords.save();
//     }
//     catch(e){
//         res.send(e)
//     }
// })
//we will handle post req =>not hard code
router.post("/mens",async(req,res)=>{
    try{
        const addingMensRecords=new MenRanking(req.body)
        console.log(req.body)
        const insertMens=await addingMensRecords.save();
        res.status(201).send(insertMens)
    }
    catch(e){
        res.status(400).send(e)
    }
})
//get all mens
router.get("/mens",async(req,res)=>{
    try{
        // const getMens=await MenRanking.find({})
        const getMens=await MenRanking.find({}).sort({"ranking":-1})
        res.send(getMens)
    }
    catch(e){
        res.status(400).send(e)
    }
})
//get individual
router.get("/mens/:id",async(req,res)=>{
    const _id=req.params.id
    const getSingleMans=await MenRanking.findById(_id);
    if(!getSingleMans){
        res.status(404).send()
    }
    else{
        res.send(getSingleMans)
    }
})
//patch update for individual
router.patch("/mens/:id",async(req,res)=>{
    try{
        const _id=req.params.id
        const updateMens= await MenRanking.findByIdAndUpdate(_id,req.body,{
            new:true,
        });
        if(!req.params.id){
            res.status(404).send()
        }
        else{
            res.send(updateMens)
        }
    }
    catch(e){
        res.status(500).send(e)
    }
})
//delete request
router.delete("/mens/:id",async(req,res)=>{
    try{
        const _id=req.params.id
        const deleteMens=await MenRanking.findByIdAndDelete(_id)
        res.send(deleteMens)
    }
    catch(e){
        res.status(500).send(e)
    }
})
module.exports=router;