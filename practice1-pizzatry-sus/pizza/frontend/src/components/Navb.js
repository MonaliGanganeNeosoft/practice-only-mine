import React ,{useState,useEffect}from 'react';
import { Navbar,Container,Nav,NavDropdown ,Row,Col,Button} from 'react-bootstrap';
import {useSelector} from "react-redux";
import {Link,useNavigate} from "react-router-dom";
const Navb = () => {
    const navigate=useNavigate();
    const count=useSelector((state=>state.count));
    const [login,setLogin]=useState(false);
    useEffect(()=>{
        setInterval(()=>{
            if(localStorage.getItem("login")){
                setLogin(true);
            }
            else{
                setLogin(false);
            }
        },100);
    },[])
    const logoutHandler=()=>{
        localStorage.removeItem("login");
        localStorage.removeItem("index");
        localStorage.removeItem("_token");
        navigate("/");
    };

  return (
    <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {login && (<Nav.Link as={Link} to="/dashboard">Menu</Nav.Link>)}
                        
                    </Nav>
                    <Nav className='mr-9'>
                        {login ?(
                            <span>
                                <Row>
                                    <Col>
                                        <Button variant='light'>
                                            <NavDropdown
                                                title="Profile"
                                                id="collasible-nav-dropdown"
                                            >
                                            <NavDropdown.Item
                                            as={Link}
                                            to="/getorders"
                                            style={{ textDecoration: "none" }}
                                            >
                                            Orders
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                            as={Link}
                                            to="/profile"
                                            style={{ textDecoration: "none" }}
                                            >
                                            Profile
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                            as={Link}
                                            to="/updateprofile"
                                            style={{ textDecoration: "none" }}
                                            >
                                            Update Profile
                                            </NavDropdown.Item>

                                            <NavDropdown.Item
                                            as={Link}
                                            to="/user"
                                            style={{ textDecoration: "none" }}
                                            >
                                            All user
                                            </NavDropdown.Item>

                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="#action/3.4">
                                            Separated link
                                            </NavDropdown.Item>
                                            </NavDropdown>

                                        </Button>
                                    </Col>
                                    <Col>
                                        <Nav.Link>
                                            <Button
                                                onClick={() => navigate("/cart")}
                                                variant="outline-dark"
                                            >
                                                {" "}
                                                Cart {count != 0 && count}
                                            </Button>
                                        </Nav.Link>
                                    </Col>
                                    <Col>
                                        <Nav.Link>
                                        <Button
                                            onClick={() => logoutHandler()}
                                            variant="outline-dark"
                                        >
                                            LogOut
                                        </Button>
                                        </Nav.Link>
                                    </Col>

                                </Row>
                            </span>
                        ):(
                            <span>
                                <Row>
                                    <Col>
                                        <Nav.Link>
                                        <Button
                                            onClick={() => navigate("/signup")}
                                            variant="outline-dark"
                                        >
                                            Signup
                                        </Button>
                                        </Nav.Link>
                                    </Col>
                                    <Col>
                                        <Nav.Link>
                                        <Button
                                            onClick={() => navigate("/login")}
                                            variant="outline-dark"
                                        >
                                            LogIn
                                        </Button>
                                        </Nav.Link>
                                    </Col>
                                </Row>

                            </span>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    
    </>
  )
}

export default Navb