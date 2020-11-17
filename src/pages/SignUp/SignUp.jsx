import React from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LogoutForm from "../../components/LogoutForm/LogoutForm";
import Nav from "../../components/Nav/Nav";

function SignUp() {
  let username = localStorage.username;
  let token = localStorage.token;

  return (
      <div>
          <div>
              <Nav />
          </div>
    
    <div>
      {token == null && (
        <div>
          <SignUpForm />
        </div>
      )}
      {token != null && (
        <div>
          <h2>
            You are already logged in as user {username}! Please log out to
            register a new user{" "}
          </h2>
          <LogoutForm />
        </div>
      )}
    </div>
    </div>
  );
}

export default SignUp;
