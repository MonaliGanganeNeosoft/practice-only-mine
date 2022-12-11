import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Button,Row,Col,Form,Container,InputGroup,FormControl } from "react-bootstrap";
import {getUsers,login} from "../config/Myservice";
const regForPassword = RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

function Login(){
  const [userdata,setUserdata] = useState([]);
  const navigate = useNavigate();
  const [user,setUser]=useState({email:"",password:""})
  const [errors,setErrors] = useState({email:"",password:""});
  useEffect(()=>{
    getUsers().then((res)=>{
      if(res.data.err == 0){
        setUserdata(res.data.data);
      }
    });
  },[]);
  const handler=(e)=>{
    const {name,value}=e.target;
    switch(name){
      case "email":let eemail = value.length > 1 ?"":"Enter valid email";
        setErrors({...errors,email:eemail})
        break; 
      case "password":let epassword = regForPassword.test(value)?"":"Enter valid password";
        setErrors({...errors,password:epassword})
        break;
      default:
    }
    setUser((prevState)=>({
      ...prevState,
      [name]:value,
    }));
  }
  const formSubmit = async (e)=>{
    console.log(userdata);
    e.preventDefault();
    if(validate(errors) && document.getElementById("email").value !== "" && document.getElementById("password").value !== "")
    {
      login(user).then((res)=>{
        if(res.data.err == 0)  {
          console.log(res.data);
          let login = user.email;
          console.log("logged in");
          localStorage.setItem("_token",res.data.token);
          localStorage.setItem("login",JSON.stringify(login));
          navigate("/dashboard");
        }
        if(res.data.err == 1){
          console.log(res.data);
          alert("Email or password is wrong");
        }
      });
    }else{
      alert("pls enter valid data")
    };
  }
  const validate=(errors)=>{
    let valid=true;
    Object.values(errors).forEach((val)=>val.length > 0 && (valid = false));
    return valid;
  };
  
 
  return (
      <div>
        <Container>
          <h1>Log In</h1>
          <Form id="myForm">
            
            <Form.Group>
              <Row className="justify-content-md-center">
                <Col xs lg="5">
                  <InputGroup className="mb-2">
                    <InputGroup.Text>@</InputGroup.Text>
                    <FormControl  type="text" placeholder=" Email"  name="email" id="email" onChange={handler}/>
                  </InputGroup>
                  {errors.email && (<Form.Text style={{ color: "red" }}>{errors.email}</Form.Text>)}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group>
              <Form.Label></Form.Label>
              <Row className="justify-content-md-center">
                <Col xs lg="5">
                  <Form.Control type="password" placeholder="Enter password" name="password" id="password" onChange={handler}/>
                  {errors.password && (<Form.Text style={{ color: "red" }}>{errors.password}</Form.Text>)}
                </Col>
              </Row>
            </Form.Group>

            <br />

            <Form.Group>
              <Button variant="outline-dark" type="submit" onClick={formSubmit}>Log In</Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
export default Login