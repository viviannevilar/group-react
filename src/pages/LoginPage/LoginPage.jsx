import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import LogoutForm from "../../components/LogoutForm/LogoutForm";
import "./LoginPage.css";



function LoginPage() {
  let username = localStorage.username;
  let token = localStorage.token;

  return (
    <div className="page-wrapper">
      {token == null && ( <LoginForm /> )}
      {token != null && (

        <div className="flex-place-items">
                  <img
          id="not-found"
          src={require("../../images/Comparalist_rectangle.png")}
          alt="Company Logo"
        />
          <h2>You are already logged in as user <span className="all-caps" >{username}</span>! Please log out!</h2>
          <LogoutForm />
        </div>
      )}
    </div>
  );
}

export default LoginPage;