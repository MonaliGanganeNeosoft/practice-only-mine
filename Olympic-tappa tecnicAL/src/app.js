const express = require('express');
require("../src/db/conn")
const MenRanking= require("../src/models/mens.model");
const router = require('./routers/mens.router');
const app=express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(router)
app.listen(port,()=>{
    console.log(`connection is live with ${port}`)
})