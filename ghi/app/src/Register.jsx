import React, { useState } from "react";
import "./Account.css";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

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
                <h1>Register</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <label style={{ color: "white" }} htmlFor="name">
                  Full name
                </label>
                <div className="form-floating mb-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    id="name"
                    placeholder="Full name"
                    className="form-control"
                  />
                </div>
                <label style={{ color: "white" }} htmlFor="email">
                  Email
                </label>
                <div className="form-floating mb-3">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="*******"
                    id="password"
                    name="password"
                    className="form-control"
                  />
                </div>
                <button className="btn btn-light" type="submit">
                  Register
                </button>
              </form>
              &nbsp;&nbsp;&nbsp;
              <div>
                <button
                  className="btn btn-light"
                  onClick={() => props.onFormSwitch("login")}
                >
                  Already have an account? Login here.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
