import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../SignUpForm/SignUpForm.css";

function SignUpForm() {
  //variables
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    preferred_name: "",
    password: "",
    userprofile: {},
  });

  //methods
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const history = useHistory();

  const postData = async () => {
    //function you can call but carry on as well
    const response = await fetch(`${process.env.REACT_APP_API_URL}users/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username != null) {
      console.log(credentials);

      postData().then((response) => {
        history.push("/login");
      });
    }
  };

  return (
    <form id="loginform">
      <h2 id="headerTitle">Create an Account</h2>

      <div className="row">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          onChange={handleChange}
        />
      </div>

      <div className="row">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="At least 6 characters" onChange={handleChange} />
      </div>

      <div className="row">
        <label htmlFor="preferred_name">Your Preferred Name:</label>
        <input
          type="text"
          id="preferred_name"
          onChange={handleChange}
        />
      </div>
      <div id="test">
        <button id="button" className="button" type="submit" onClick={handleSubmit}>
          Create your ComparaList Account!
      </button>
      </div >
    </form >
  );
}

export default SignUpForm;
