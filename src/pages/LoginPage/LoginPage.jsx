import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import LogoutForm from "../../components/LogoutForm/LogoutForm";
import Nav from "../../components/Nav/Nav";


function LoginPage() {
  let username = localStorage.username;
  let token = localStorage.token;

  return (
      <div id="Nav">
          <div>
              <Nav />
          </div>
    <div>
      {token == null && (
        <div>
          <LoginForm />{" "}
        </div>
      )}
      {token != null && (
        <div>
          <h2>You are already logged in as user {username}! Please log out!</h2>
          <LogoutForm />
        </div>
      )}
    </div>
    </div>
  );
}

export default LoginPage;