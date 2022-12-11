import React, { useState } from 'react';
import {addSignup} from "../config/Myservice"
import { Form,Button,Row,Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = /^[a-zA-Z ]{2,100}$/;
const regForPassword = RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);
export default function Signup() {
  const navigate=useNavigate();
  const [user,setUser]=useState({fname:"",lname:"",email:"",password:"",repeatpassword:""});
  const [errors,setErrors]=useState({fname:"",lname:"",email:"",password:"",repeatpassword:""})
  const handler=(e)=>{
    const {name,value}=e.target;
    switch(name){
      case "fname":let efname=regForName.test(value)?"":"pls enter vaild fname";
        setErrors({...errors,fname:efname});
        break;
      case "lname":let elname=regForName.test(value)?"":"pls enter vaild lname";
        setErrors({...errors,lname:elname});
        break;
      case "email":let eemail=regForEmail.test(value)?"":"enter valid email";
        setErrors({...errors,email:eemail});
        break;
      case "password":let epassword=regForPassword.test(value)?"":"pls enter valid password";
        setErrors({...errors,password:epassword});
        break;
      case "repeatpassword":let erepeatpassword=value !== user.password ?"password dont match":"";
        setErrors({...errors,repeatpassword:erepeatpassword});
        break;
        default:
    }
    setUser((prevState)=>({
      ...prevState,
      [name]:value
    }));

  }

  const formSubmit=async(e)=>{
    e.preventDefault();
    if(validate(errors) && document.getElementById("fname").value !== "" && document.getElementById("lname").value !== "" && document.getElementById('email').value !== "" && document.getElementById("password").value !== "" && document.getElementById("repeatpassword").value !== "" )
    {
      let formData={
        fname:user.fname,
        lname:user.lname,
        email:user.email,
        password:user.password,
      };
      addSignup(formData).then((res)=>{
        console.log(res.data)
      })
      alert("Registered successfully")
      document.getElementById("myForm").reset();
      navigate("/login");
    }else{
      alert("pls enter valid data")
    }
  };
  const validate=(errors)=>{
    let valid=true;
    Object.values(errors).forEach((val)=>val.length > 0 && (valid = false));
    return valid;
  };

  if(localStorage.getItem("login")) {   //->>>for logged in direct register to go dashboard
    return <h1>You Are Logged In</h1>;   
  } else {
    return (
      <>
      <Container className='mt-3'>
        <h1>Signup</h1>
        <Form id="myForm">
          
          <Form.Group>
            {/* fname,lname in one row */}
            <Row className="justify-content-md-center">
              <Col xs lg="3">
                <Form.Control placeholder='first name' name="fname" id="fname" onChange={handler} />
                {errors.fname && (
                  <Form.Text style={{color:"red"}}>{errors.fname}</Form.Text>
                )}
              </Col>
              <Col xs lg="3">
                <Form.Control placeholder='last name' name="lname" id="lname" onChange={handler} />
                {errors.lname && (
                  <Form.Text style={{color:"red"}}>{errors.lname}</Form.Text>
                )}
              </Col>
            </Row>
          </Form.Group>
  
          {/* for email field */}
          <Form.Group>
            <Row className='justify-content-md-center'>
              <Col xs lg="6">
                <Form.Control type='email' placeholder='Enter email' name='email' id="email" onChange={handler} />
                {errors.email && (
                  <Form.Text style={{color:"red"}}>{errors.email}</Form.Text>
                )}
              </Col>
            </Row>
          </Form.Group>
          
          <Form.Group>
          {/* //for password and confirm password in one row */}
            <Row className='justify-content-md-center'>
              <Col xs lg="3">
                <Form.Control type='password' placeholder='Enter password' name="password" id="password" onChange={handler} />
                {errors.password && (
                  <Form.Text style={{color:"red"}}>{errors.password}</Form.Text>
                )}
              </Col>
              <Col xs lg="3">
                <Form.Control type='password' placeholder='Confirm password' name="repeatpassword" id="repeatpassword" onChange={handler} />
                {errors.repeatpassword && (
                  <Form.Text style={{color:"red"}}>{errors.repeatpassword}</Form.Text>
                )}
              </Col>
  
            </Row>
          </Form.Group>
  
          <br/>
  
          {/* for submit btn */}
          <Form.Group>
            <Button variant='primary' type="submit" onClick={formSubmit}>Signup</Button>
          </Form.Group>
      
        </Form>
      </Container>
      </>
    )
 }
}
