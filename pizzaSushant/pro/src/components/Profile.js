import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { getUser } from "../config/Myservice";

function Profile() {
  const [uid, setUid] = useState("");
  const [userdata, setUserdata] = useState([]);

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

  if (localStorage.getItem("_token")) {
    return (
      <div>
        <Container className=" mt-3">
          {
            <div className="text-start">
              <h1>Profile</h1>
              <br />
              <h2>
                Name: {userdata.fname} {userdata.lname}
              </h2>
              <h2>Email: {userdata.email}</h2>
              <h2>Mobile No: {userdata.mobile}</h2>
              <h2>Address: {userdata.address}</h2>
            </div>
          }
        </Container>
      </div>
    );
  } else {
    return <h1>You Are Logged In</h1>;
  }
}

export default Profile;
