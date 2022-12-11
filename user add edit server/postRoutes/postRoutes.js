const express = require('express');
const { addUSers, editUser } = require('../Controllers/PostCotroller');
const router = express.Router()

router.post('/addUser',(req,res)=>{
    addUSers(req.body)
})
router.put('/updateUser/:id',(req,res)=>{
    editUser(req,res);
})
module.exports=router