import React,{useState,useEffect, Profiler} from "react";
import { Container } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { getSingleUser } from "../config/Myservice";


function Profile(){
  const [uid,setUid]=useState("");
  const[userdata,setUserdata]=useState([]);
  useEffect(()=>{
    if(localStorage.getItem("_token")!=undefined){
      let token = localStorage.getItem("_token");
      console.log(token)//get token
      let decode = jwt_decode(token);
      console.log(decode);//{uid: 'monali.gangane@gmail.com', iat: 1646283112, exp: 1646643112}
      console.log(decode.uid);
      setUid(decode.uid);

      //geting email in (uid)
      let uid = decode.uid;
      getSingleUser(uid).then((res)=>{
        if(res.data.err == 0){
          setUserdata(res.data.data);
          console.log(res.data.data)
        }
      });
    }
  },[]);
  if(localStorage.getItem("_token")){
    return(
      <div>
        <Container className="mt-3" >
          {
            <div className="text-start">
              <h1>Profile</h1>
              <br/>
              <h2>Name:{userdata.fname}{userdata.lname}</h2>
              <h2>Email:{userdata.email}</h2>
            </div>
          }
        </Container>
      </div>
    );
  }else{
    return <h1>You ar logged in</h1>
  }
}
export default Profile;