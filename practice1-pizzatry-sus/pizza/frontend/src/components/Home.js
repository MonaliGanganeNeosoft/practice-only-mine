import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate=useNavigate();
  return (
    <>
    <p>hii home page</p>
    <Button onClick={()=>navigate("/signup")} variant="primary">Signup</Button>{' '}
    </>
  )
}
