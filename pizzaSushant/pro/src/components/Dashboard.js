import React, { useEffect, useState } from "react";
import { getPizzaData } from "../config/Myservice";
import { Card, Button, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
function Dashboard() {
  const [prodata, setProdata] = useState([]);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const [uid, setUid] = useState("");
  useEffect(() => {
    getPizzaData().then((res) => {
      if (res.data.err == 0) {
        setProdata(res.data.data);
      }
    });
    const getcart = JSON.parse(localStorage.getItem("cart"));
    if (getcart) {
      setCart(getcart);
      const count = JSON.parse(localStorage.getItem("cart"))
        .map((item) => Number(item.quantity))
        .reduce((prev, curr) => prev + curr, 0);
      console.log("count" + count);
      dispatch({ type: "count", payload: count });
    }

    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      let decode = jwt_decode(token);
      console.log(decode.uid);
      setUid(decode.uid);
    }
  }, []);

  const addCart = (id, prod) => {
    let obj = {
      id: prod.id,
      pname: prod.pname,
      price: prod.price,
      image: prod.image,
      quantity: 1,
    };
    console.log(obj);
    console.log(cart);
    console.log(prod);
    if (localStorage.getItem("cart")) {
      let array = JSON.parse(localStorage.getItem("cart"));
      let found = array.some((cart) => cart["id"] === id);
      if (found == true) {
        alert("Product Already added");
        if (JSON.parse(localStorage.getItem("cart"))) {
          const count = JSON.parse(localStorage.getItem("cart"))
            .map((item) => Number(item.quantity))
            .reduce((prev, curr) => prev + curr, 0);

          dispatch({ type: "count", payload: count });
        }
      } else {
        array.push(obj);
        localStorage.setItem("cart", JSON.stringify(array));
        const count = JSON.parse(localStorage.getItem("cart"))
          .map((item) => Number(item.quantity))
          .reduce((prev, curr) => prev + curr, 0);

        dispatch({ type: "count", payload: count });
        alert("Product added to Cart");
      }
    } else {
      let array = [];

      array.push(obj);

      localStorage.setItem("cart", JSON.stringify(array));

      if (JSON.parse(localStorage.getItem("cart"))) {
        const count = JSON.parse(localStorage.getItem("cart"))
          .map((item) => Number(item.quantity))
          .reduce((prev, curr) => prev + curr, 0);
        console.log("count" + count);
        dispatch({ type: "count", payload: count });
      }

      alert("Product added to Cart");
    }
  };

  return (
    <div>
      <Container className="mt-4">
        <Row xs={6} md={4} className="justify-content-center">
          {prodata.length > 0 &&
            prodata.map((prod, i) => (
              <Card
                key={i}
                style={{ width: "18rem", margin: "10px" }}
                className="bg-light bg-gradient"
              >
                <Card.Img
                  variant="top"
                  src={prod.image}
                  className="mt-1 bg-gradient"
                  width="200"
                  height="250"
                />
                <Card.Body>
                  <Card.Title>{prod.pname}</Card.Title>

                  <Card.Text>
                    {prod.price} <b>₹</b>
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => addCart(prod.id, prod)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
