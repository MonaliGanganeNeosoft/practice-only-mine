import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Row,
  Col,
  Form,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import { deleteUser, updateUser } from "../config/Myservice";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getUser } from "../config/Myservice";

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = /^[a-zA-Z ]{2,100}$/;
const regForPassword = RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);
const regForMobile = RegExp(
  /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
);
function Updateprofile() {
  const navigate = useNavigate();
  // const index = useSelector(state => state.index)
  const [uid, setUid] = useState("");

  const [userdata, setUserdata] = useState([]);
  const refemail = useRef(null);
  const reffname = useRef(null);
  const reflname = useRef(null);
  const refmobile = useRef(null);
  const refaddress = useRef(null);
  const refpassword = useRef(null);

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    repeatpassword: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    repeatpassword: "",
    address: "",
  });

  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      let decode = jwt_decode(token);
      console.log(decode.uid);
      setUid(decode.uid);
      let uid = decode.uid;
      getUser(uid).then((res) => {
        if (res.data.err == 0) {
          setUserdata(res.data.data);
          console.log(res.data.data);
        }
      });
    }
  }, []);

  const handler = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "fname":
        let efname = regForName.test(value) ? "" : "Please Enter Valid Name";
        setErrors({ ...errors, fname: efname });
        console.log(value);
        break;
      case "lname":
        let elname = regForName.test(value) ? "" : "Please Enter Valid Name";
        setErrors({ ...errors, lname: elname });
        break;
      case "email":
        let eemail = regForEmail.test(value) ? "" : "Enter Valid Email";
        setErrors({ ...errors, email: eemail });
        break;
      case "mobile":
        let emobile = regForMobile.test(value) ? "" : "Enter Valid Mobile No";
        setErrors({ ...errors, mobile: emobile });
        console.log(emobile);
        break;

      case "password":
        let epassword = regForPassword.test(value)
          ? ""
          : "Enter Valid Password";
        setErrors({ ...errors, password: epassword });
        break;
      case "repeatpassword":
        console.log(user.password);
        console.log(value);
        let erepeatpassword =
          value !== user.password ? "Password Dont Match" : "";
        setErrors({ ...errors, repeatpassword: erepeatpassword });
        break;
      case "address":
        let eaddress =
          value.length > 10 ? "" : "Address must have more than 10 alphabets";
        setErrors({ ...errors, address: eaddress });
        break;

      default:
    }
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onDeleteHandler = (index) => {
    deleteUser(index).then((res) => {
      console.log(res.data);
    });
    localStorage.removeItem("login");
    localStorage.removeItem("index");
    navigate("/");
    alert("Deleted");
  };

  const UpdateUserHandler = async (event) => {
    event.preventDefault();
    // setUser({ ...user, cource: selectedc });
    if (
      validate(errors) &&
      document.getElementById("fname").value !== "" &&
      document.getElementById("lname").value !== "" &&
      document.getElementById("email").value !== "" &&
      document.getElementById("mobile").value !== "" &&
      document.getElementById("password").value !== "" &&
      document.getElementById("repeatpassword").value !== "" &&
      document.getElementById("address").value !== ""
    ) {
      let formData = {
        fname: reffname.current.value,
        lname: reflname.current.value,
        mobile: refmobile.current.value,
        email: refemail.current.value,
        password: refpassword.current.value,
        address: refaddress.current.value,
      };
      updateUser(userdata._id, formData).then((res) => {
        console.log(res.data);
      });

      alert("Updated Succesfully");

      document.getElementById("myForm").reset();
      localStorage.removeItem("login");
      localStorage.removeItem("index");
      localStorage.removeItem("_token");
      navigate("/login");
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
    return (
      <div>
        <Container className=" mt-3">
          <h1>Update Data</h1>
          <Form id="myForm">
            <Form.Group>
              <Form.Label></Form.Label>
              <Row className="justify-content-md-center">
                <Col xs lg="3">
                  <Form.Control
                    placeholder="First name"
                    name="fname"
                    id="fname"
                    ref={reffname}
                    onChange={handler}
                    defaultValue={userdata.fname}
                  />

                  {errors.fname && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.fname}
                    </Form.Text>
                  )}
                </Col>
                <Col xs lg="3">
                  <Form.Control
                    placeholder="Last name"
                    name="lname"
                    id="lname"
                    ref={reflname}
                    onChange={handler}
                    defaultValue={userdata.lname}
                  />
                  {errors.lname && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.lname}
                    </Form.Text>
                  )}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row className="justify-content-md-center">
                <Col xs lg="6">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    id="email"
                    ref={refemail}
                    onChange={handler}
                    defaultValue={userdata.email}
                  />
                  {errors.email && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.email}
                    </Form.Text>
                  )}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row className="justify-content-md-center">
                <Col xs lg="6">
                  <Form.Label></Form.Label>
                  <InputGroup className="mb-2">
                    <FormControl
                      type="Number"
                      placeholder="Mobile No"
                      name="mobile"
                      id="mobile"
                      ref={refmobile}
                      onChange={handler}
                      defaultValue={userdata.mobile}
                    />
                  </InputGroup>
                  {errors.mobile && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.mobile}
                    </Form.Text>
                  )}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Form.Label></Form.Label>
              <Row className="justify-content-md-center">
                <Col xs lg="3">
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    id="password"
                    onChange={handler}
                    ref={refpassword}
                  />
                  {errors.password && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.password}
                    </Form.Text>
                  )}
                </Col>
                <Col xs lg="3">
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    name="repeatpassword"
                    id="repeatpassword"
                    onChange={handler}
                  />
                  {errors.repeatpassword && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.repeatpassword}
                    </Form.Text>
                  )}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row className="justify-content-md-center">
                <Col xs lg="6">
                  <Form.Label></Form.Label>
                  <InputGroup className="mb-2">
                    <FormControl
                      type="text"
                      placeholder="Enter Address"
                      name="address"
                      id="address"
                      ref={refaddress}
                      onChange={handler}
                      as="textarea"
                      rows={3}
                      defaultValue={userdata.address}
                    />
                  </InputGroup>
                  {errors.address && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.address}
                    </Form.Text>
                  )}
                </Col>
              </Row>
            </Form.Group>
            <br />
            <Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={UpdateUserHandler}
              >
                Update
              </Button>
              &nbsp;
              <Button
                variant="danger"
                onClick={() => onDeleteHandler(userdata._id)}
              >
                {" "}
                Delete Account
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  } else {
    return <h1>You Are Logged In</h1>;
  }
}

export default Updateprofile;
