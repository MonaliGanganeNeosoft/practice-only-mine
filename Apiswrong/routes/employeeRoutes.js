const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
router.use(bodyparser.json());

const postData = require('../controller/empController');
const getData = require('../controller/empController');
const updateData = require('../controller/empController');
const deleteData = require('../controller/empController');

//dbconnection 
const connectDB = require('../config/db');
connectDB;
//end

router.get('/get',getData.getData)
router.post('/post',postData.postData)
router.put('/put/:id',updateData.updateData)
router.delete('/delete/:id',deleteData.deleteData) 

module.exports = router;