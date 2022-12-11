const express=require("express");
const mongoose=require("mongoose")
const PORT = 4000;
const app=express();
// app.use(express.urlencoded({extended:false}))
// const bodyParser=require('body-parser');
app.use(express.urlencoded({extended: true})); 


const StudentModel=require("./studentschema");

//db connection
const db = "mongodb://localhost:27017/Studentcrud";
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("Mongodb connected");
  } catch (err) {
    console.log(err.message);
  }
};
connectDB();

// app.get('/save', function(req, res) {
//     const newStudent = new StudentModel({StudentId:1, 
//         Name:"Sam3", Roll:1, Birthday:2001-09-08});

//     newStudent.save(function(err, data) {
//         if(err) {
//             console.log(error);
//         }
//         else {
//             res.send("Data inserted");
//         }
//     });
// });


    app.post('/save', function(req, res) {
        const newStudent = new StudentModel();
           newStudent.StudentId = req.body.StudentId;
           newStudent.Name = req.body.Name;
           newStudent.Roll = req.body.Roll;
           
           newStudent.save(function(err, data){
            console.log(data)

               if(err){
                   console.log(error);
               }
               else{
                   res.send("Data inserted");
                   console.log(data)
               }
           });
        });


  app.get('/findall', function(req, res) {
      StudentModel.find(function(err, data) {
          if(err){
              console.log(err);
          }
          else{
              res.send(data);
          }
      });  
   });

   app.get('/findfirst', function(req, res) {
    StudentModel.findOne({StudentId:{$gt:1}}, 
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
});

app.get('/delete', function(req, res) {
  StudentModel.remove({StudentId:1}, 
  function(err, data) {
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
      }
  });  
});

app.post('/update', function(req, res) {
  StudentModel.findByIdAndUpdate(req.body.id, 
  {Name:req.body.Name}, function(err, data) {
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
          console.log("Data updated!");
      }
  });  
});
// app.post('/delete/:id', function(req, res) {
//   StudentModel.findByIdAndDelete((req.body.id), 
//   function(err, data) {
//       if(err){
//           console.log(err);
//       }
//       else{
//           res.send(data);
//           console.log("Data Deleted!");
//       }
//   });  
// });


app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Work on ${PORT}`);
});
  