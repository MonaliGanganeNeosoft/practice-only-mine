const express = require('express');
const port=8888;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to uncaught exception`);
    process.exit(1);
});
const connectDb=require('./Config/DataBase')

const postRoutes= require('./postRoutes/postRoutes')

app.use('/api/',postRoutes);

connectDb()
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Api is working on ${port}`);
})

// Unhandled promise Rejection
process.on("unhandled rejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);

    Server.Close(()=>{
        process.exit(1);
    });
})