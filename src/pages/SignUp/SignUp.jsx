import React from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LogoutForm from "../../components/LogoutForm/LogoutForm";

function SignUp() {
  let username = localStorage.username;
  let token = localStorage.token;

  return (
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
  );
}

export default SignUp;
