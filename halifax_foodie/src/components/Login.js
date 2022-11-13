import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

export default function Login() {
  const history = useHistory();

  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");

  const [error, seterror] = useState();

  const onSubmitForm = (e) => {
    // history.push("/Dashboard");
    //setisValid(true);
    e.preventDefault();

    Auth.signIn({
      username: username,
      password: password,
    }).then(async (obj) => {
      // setuserDetails(JSON.stringify(a))
      localStorage.setItem("user", JSON.stringify(obj));
      history.push("/");

      history.push("/question");
    });

    // const user = new CognitoUser({
    //     Username: email,
    //     Pool: UserPool,
    // });

    // const authDetails = new AuthenticationDetails({
    //     Username: email,
    //     Password: password,
    // });

    // user.authenticateUser(authDetails, {
    //     onSuccess: (data) => {
    //         history.push("/dashboard")
    //     },
    //     onFailure: (err) => {
    //         console.error("On error:", err)
    //         seterror(err.message)
    //     },
    //     newPasswordRequired: (data) => {
    //     },
    // });
  };

  return (
    <>
      <div className="all-content-center">
        <div className="container">
          <div className="center-box">
            <div className="main-box">
              <form onSubmit={(e) => onSubmitForm(e)}>
                <div className="heading-text">
                  <h1> Login Form</h1>
                </div>

                <div className="cus-form form-top-space">
                  <span>Email</span>
                  <input
                    className="input-design top-space"
                    type="text"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    placeholder="Your Email Address"
                  />
                </div>
                <div className="cus-form form-top-space">
                  <span>Password</span>
                  <input
                    className="input-design top-space"
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                {error}
                <div className="cus-form form-top-space">
                  <button type="submit">Submit</button>
                  <NavLink to="/forgotpassword">Forgot Password</NavLink>
                </div>

                <div className="cus-form form-top-space">
                  <NavLink to="/register">New User?</NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
