const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//db connection
const db = "mongodb://localhost:27017/pizzaapp";
//JWT
const jwt = require("jsonwebtoken");
const jwtSecret = "asdsahdhasdvh242143hjbhasdf3wq";
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.json({ err: 1, msg: "Token not matched" });
  } else {
    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.json({ err: 1, msg: "Token incorrect" });
      } else {
        next();
      }
    });
  }
}
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("mongo db connected");
  } catch (err) {
    console.log(err.message);
  }
};
connectDB();

const userModel = require("../db/userSchema");
const pizzaModel = require("../db/pizzaSchema");
const orderModel = require("../db/orderSchema");

router.get("/users", (req, res) => {
  userModel.find({}, (err, data) => {
    if (err) throw err;
    else {
      res.json({ err: 0, data: data });
    }
  });
});
router.get("/user/:email", (req, res) => {
  const email = req.params.email;
  userModel.findOne({ email: email }, (err, data) => {
    if (err) throw err;
    else {
      res.json({ err: 0, data: data });
    }
  });
});

router.get("/pizzadata", authenticateToken, (req, res) => {
  pizzaModel.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ err: 0, data: data });
    }
  });
});
router.get("/getorders", (req, res) => {
  orderModel.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ err: 0, data: data });
    }
  });
});
router.post("/login", (req, res) => {
  let email = req.body.username;
  let password = req.body.password;

  userModel.findOne({ email: email, password: password }, (err, data) => {
    if (err) {
      res.json({ err: 1, msg: "Email or password is not correct" });
    } else if (data == null) {
      res.json({ err: 1, msg: "Email or password is not correct" });
    } else {
      let payload = {
        uid: email,
      };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
      res.json({ err: 0, msg: "login successfull", token: token });
    }
  });
});
router.post("/signup", (req, res) => {
  console.log("In signup");
  console.log(req.body);
  let fname = req.body.fname;
  let lname = req.body.lname;
  let email = req.body.email;
  let mobile = req.body.mobile;
  let password = req.body.password;
  let address = req.body.address;
  //insert data

  let ins = new userModel({
    fname: fname,
    lname: lname,
    email: email,
    mobile: mobile,
    password: password,
    address: address,
  });

  ins.save((err) => {
    if (err) {
      res.send("Already Added" + err.message);
    } else {
      res.send("Category Added");
    }
  });
});

router.post("/checkout", (req, res) => {
  console.log(req.body);
  let cart = req.body.cart;
  let total = req.body.total;
  let cardnum = req.body.cardnum;
  let email = req.body.uid;
  let ins = new orderModel({
    orders: cart,
    total: total,
    cardnum: cardnum,
    email: email,
  });
  ins.save((err) => {
    if (err) {
      res.send("Already Added" + err.message);
    } else {
      res.send("Category Added");
    }
  });
});

router.delete("/deleteuser/:id", (req, res) => {
  const id = req.params.id;
  userModel.deleteOne({ _id: id }, (err) => {
    if (err) throw err;
    else {
      res.send("Category Deleted");
    }
  });
  console.log(index);
});
router.put("/updateuser/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  console.log(id);

  let fname = req.body.fname;
  let lname = req.body.lname;
  let email = req.body.email;
  let mobile = req.body.mobile;
  let password = req.body.password;
  let address = req.body.address;
  userModel.updateOne(
    { _id: id },
    {
      $set: {
        fname: fname,
        lname: lname,
        email: email,
        mobile: mobile,
        password: password,
        address: address,
      },
    },
    (err) => {
      if (err) throw err;
      else {
        res.send("Category Updated");
      }
    }
  );

  //
});
module.exports = router;
