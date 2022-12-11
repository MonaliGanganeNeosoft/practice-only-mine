const Emp = require('../db/employeeSchema')
// const { check, validationResult } = require('express-validator');

async function getData(req,res,next){
    await Emp.find({}).then((data)=>{
      res.send(data)
    })
  }

async function postData(req,res,next){
  let empName = req.body.empName;
  let empEmail = req.body.empEmail;
  let empMobile = req.body.empMobile;
  let empSalary = req.body.empSalary;
  let emp = new Emp({
    empName,
    empEmail,
    empMobile,
    empSalary
  })
  await emp.save().then((data)=>{
    res.send(data)
  })
} 

async function updateData(req,res,next){
   await Emp.findByIdAndUpdate(req.params.id,req.body, (err,emp)=>{
      if (err) {
        return res.status(500).send({error: "Problem with Updating the   Employee recored "})
      };
      res.send({success: "Updation successfull"});
    })
  } 

async function deleteData(req,res,next){
    await Emp.findByIdAndDelete(req.params.id, (err,emp)=>{
      if(err){
        return res.status(500).send({error: "Problem with Deleting the Employee recored "})
      }
      res.send({success: 'Employee deleted successfully'})
    })
  }

module.exports = {getData, postData, updateData, deleteData };