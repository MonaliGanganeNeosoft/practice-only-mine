import React, { useState } from "react";
import { login } from "../config/Myservice";
import { Redirect } from "react-router-dom";

export default function Login(props) {
  const [state, setState] = useState({ email: "", password: "" });
  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const postRegis = (event) => {
    event.preventDefault();
    login(state).then((res) => {
      if (res.data.err == 0) {
        localStorage.setItem("_token", res.data.token);
        // props.history.push("/posts");
        <Redirect to="/posts" />;
      }
      if (res.data.err == 1) {
        console.log(res.data);
      }
    });
  };
  return (
    <div>
      <h2>Login here</h2>
      <form method="post" onSubmit={postRegis}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handler}
          ></input>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handler}
          />
        </div>

        <input type="submit" value="Login" className="btn btn-success" />
      </form>
    </div>
  );
}
