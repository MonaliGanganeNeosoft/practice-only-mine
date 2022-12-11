import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {updateProfile,deleteUser} from "../config/Myservice";
import { getSingleUser } from '../config/Myservice';
import jwt_decode from "jwt-decode"
import { Container,Row,Col, Form, Button } from 'react-bootstrap';

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = /^[a-zA-Z ]{2,100}$/;
const regForPassword = RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

function Updateprofile() {
  const navigate = useNavigate();
  const [uid,setUid] = useState("");
  const [userdata,setUserdata] = useState([]);
  const reffname = useRef(null);
  const reflname = useRef(null);
  const refemail = useRef(null);
  const refpassword = useRef(null);

  const [user,setUser] = useState({fname:"",lname:"",email:"",password:"",repeatpassword:""});
  const [errors,setErrors] = useState({fname:"",lname:"",email:"",password:"",repeatpassword:""});

  useEffect(()=>{
    if(localStorage.getItem("_token")!=undefined){
      let token = localStorage.getItem("_token");
      let decode = jwt_decode(token);
      console.log(decode.uid);//temp@gmail.com
      setUid(decode.uid);
      let uid = decode.uid;
      console.log(uid)//temp@gmail.com
      getSingleUser(uid).then((res)=>{
        if(res.data.err == 0){
          setUserdata(res.data.data);
          console.log(res.data.data)
        }
      })
    }
  },[])

  const handler=(e)=>{
    const {name,value} = e.target;
    switch(name){
      case "fname":let efname = regForName.test(value)?"":"pls enter valid fname";
        setErrors({...errors,fname:efname});
        break;
      case "lname":let elname = regForName.test(value)?"":"valid lname";
        setErrors({...errors,lname:elname});
        break;
      case "email":let eemail = regForEmail.test(value)?"":"valid email";
        setErrors({errors,email:eemail});
        break;
      case "password":let epassword = regForPassword.test(value)?"":"ente valid password";
        setErrors({...errors,password:epassword});
        break;
      case "repeatpassword":let erepeatpassword = value !== user.password ? "psd does not match":"";
        setErrors({...errors,repeatpassword:erepeatpassword});
        break;
      default:
    }
    setUser((prevState)=>({
      ...prevState,
      [name]:value,
    }));
  };
  const onDeleteHandler=(index)=>{
    console.log("delete click")
    deleteUser(index).then((res)=>{
      console.log(res.data);
    });
    localStorage.removeItem("login");
    localStorage.removeItem("index");
    localStorage.removeItem("_token");
    navigate("/");
    alert("Deleted")
  }
  const UpdateUserHandler=async(e)=>{
    e.preventDefault();
    if(validate(errors) && document.getElementById("fname").value !== "" && document.getElementById("lname").value !=="" && document.getElementById("email").value !=="" && document.getElementById("password").value !== "" && document.getElementById("repeatpassword").value !== ""){
      let formData = {fname:reffname.current.value,lname:reflname.current.value,email:refemail.current.value,password:refpassword.current.value};
      updateProfile(userdata._id,formData).then((res)=>{ //geting _id from this
        console.log(res.data)
      });
      alert("updated success")
      document.getElementById("myForm").reset();
      localStorage.removeItem("login");
      localStorage.removeItem("index");
      localStorage.removeItem("_token");
      navigate("/login")
    }else{
      alert("pls enter valid data")
    }
  };

  const validate=(e)=>{
    let valid = true ;
    Object.values(errors).forEach((val)=>val.length > 0 && (valid = false));
    return valid;
  };
  return (
    <Container className='mt-3'>
      <h1>Update data</h1>
      <Form id="myForm">

        {/* //first and last name */}
        <Form.Group>
          <Row className="justify-content-md-center">
            <Col xs lg="3">
              <Form.Control placeholder='first name' name="fname" id="fname" ref={reffname} onChange={handler} defaultValue={userdata.fname} ></Form.Control>
              {errors.fname && (<Form.Text style={{color:"red"}}>{errors.fname}</Form.Text>)}
            </Col>
            <Col xs lg="3">
              <Form.Control placeholder='last name' name="lname" id="lname" ref={reflname} onChange={handler} defaultValue={userdata.lname} ></Form.Control>
              {errors.lname && (<Form.Text style={{color:"red"}}>{errors.lname}</Form.Text>)}
            </Col>
          </Row>
        </Form.Group>

        {/* //for email */}
        <Form.Group>
          <Row className="justify-content-md-center">
            <Col xs lg="6">
              <Form.Control type='email' placeholder='Enter email' name="email" id="email" ref={refemail} onChange={handler} defaultValue={userdata.email} ></Form.Control>
              {errors.email && (<Form.Text style={{color:"red"}}>{errors.email}</Form.Text>)}
            </Col>
          </Row>
        </Form.Group>


        {/* //for psd and cpsd */}
        <Form.Group>
          <Row className='justify-content-md-center'>
            <Col xs lg="3">
            <Form.Control type="password" placeholder='enter pass' name="password" id="password" onChange={handler}  ref={refpassword}></Form.Control>
            {errors.password && (<Form.Text style={{color:"red"}}>{errors.password}</Form.Text>)}
            </Col>

            <Col xs lg="3">
            <Form.Control type="password" placeholder='enter confirmpass' name="repeatpassword" id="repeatpassword" onChange={handler} ></Form.Control>
            {errors.repeatpassword && (<Form.Text style={{color:"red"}}>{errors.repeatpassword}</Form.Text>)}
            </Col>
          </Row>
        </Form.Group>

        <br/>

        <Form.Group>
          <Button variant='primary' type="submit" onClick={UpdateUserHandler}>Update</Button> &nbsp; 
          <Button variant='danger' onClick={()=>onDeleteHandler(userdata._id)}>Delete account</Button>

        </Form.Group>
      </Form>
    </Container>
  )
}

export default Updateprofile