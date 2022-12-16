import React, { useState } from "react";
import "./Account.css";

export const Login = (props) => {
  const [login, setLogin] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth-form-container">
      <video src="/videos/black.mp4" type="video/mp4" autoPlay loop muted />
      <div className="col-md-12 text-center">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <div className="col-md-12 text-center" style={{ color: "white" }}>
                <h1>Login</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <label style={{ color: "white" }} htmlFor="email">
                  Email
                </label>
                <div className="form-floating mb-3">
                  <input
                    value={login.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="example@gmail.com"
                    id="email"
                    name="email"
                    className="form-control"
                  />
                </div>
                <label style={{ color: "white" }} htmlFor="password">
                  Password
                </label>
                <div className="form-floating mb-3">
                  <input
                    value={login.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="*******"
                    required
                    id="current-password"
                    name="current-password"
                    className="form-control"
                  />
                </div>
                <button className="btn btn-light" type="submit">
                  Login
                </button>
              </form>
              &nbsp;&nbsp;&nbsp;
              <div>
                <button
                  className="btn btn-light"
                  onClick={() => props.onFormSwitch("register")}
                >
                  Don't have an account? Register here.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
