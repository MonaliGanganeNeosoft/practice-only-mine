import React, { useEffect, useState } from 'react';
import { Container ,Table} from 'react-bootstrap';
import {getUsers} from "../config/Myservice";
//Basic user table for learning bc to fr logic
function Getuser() {
    const [user,setUser]=useState();
    useEffect(()=>{
        getUsers().then((res)=>{
            if(res.data.err==0){
                setUser(res.data.data)
                console.log(res.data.data);
            }
        })
    },[])
  return (
    <>
    <Container>
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>password</th>
          </tr>
        </thead>
        <tbody>
          {/* //refershing not working */}
          {/* {user.map((use,i)=>(
            <tr>
              <td>{i+1}</td>
              <td>{use.fname}</td>
              <td>{use.password}</td>
            </tr>
          ))} */}
        </tbody>
      </Table>
    </Container>
    </>
  )
}

export default Getuser