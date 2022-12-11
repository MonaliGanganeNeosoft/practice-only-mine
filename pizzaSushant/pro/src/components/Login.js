import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Button,
  Row,
  Col,
  Form,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import { getUsers, login } from "../config/Myservice";

const regForPassword = RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

function Login() {
  // const dispatch = useDispatch();

  const [userdata, setUserdata] = useState([]);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    getUsers().then((res) => {
      if (res.data.err == 0) {
        setUserdata(res.data.data);
      }
    });
  }, []);

  const handler = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "username":
        let eusername = value.length > 1 ? "" : "Enter Valid UserName";
        setErrors({ ...errors, username: eusername });

        break;

      case "password":
        let epassword = regForPassword.test(value)
          ? ""
          : "Enter Valid Password";
        setErrors({ ...errors, password: epassword });
        break;

      default:
    }
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formSubmit = async (event) => {
    console.log(userdata);
    event.preventDefault();

    if (
      validate(errors) &&
      document.getElementById("username").value !== "" &&
      document.getElementById("password").value !== ""
    ) {
      // var ver = false;
      login(user).then((res) => {
        if (res.data.err == 0) {
          console.log(res.data);
          let login = user.username;

          console.log("logged in");
          localStorage.setItem("_token", res.data.token);

          localStorage.setItem("login", JSON.stringify(login));
          navigate("/dashboard");
        }
        if (res.data.err == 1) {
          console.log(res.data);
          alert("Username/Email or Password is wrong");
        }
      });
    } else {
      alert("Please Enter Valid Data");
    }
  };
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  if (localStorage.getItem("login")) {
    return <h1>You Are Logged In</h1>;
  } else {
    return (
      <div>
        <Container>
          <h1>Log In</h1>
          <Form id="myForm">
            <Form.Group>
              <Row className="justify-content-md-center">
                <Col xs lg="5">
                  <Form.Label></Form.Label>
                  <InputGroup className="mb-2">
                    <InputGroup.Text>@</InputGroup.Text>

                    <FormControl
                      type="text"
                      placeholder="Username / Email"
                      name="username"
                      id="username"
                      onChange={handler}
                    />
                  </InputGroup>
                  {errors.username && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.username}
                    </Form.Text>
                  )}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Form.Label></Form.Label>
              <Row className="justify-content-md-center">
                <Col xs lg="5">
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    id="password"
                    onChange={handler}
                  />
                  {errors.password && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.password}
                    </Form.Text>
                  )}
                </Col>
              </Row>
            </Form.Group>

            <br />

            <Form.Group>
              <Button variant="outline-dark" type="submit" onClick={formSubmit}>
                Log In
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Login;
