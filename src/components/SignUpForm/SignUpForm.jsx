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
    const response = await fetch(`${process.env.REACT_APP_API_URL}register/`, {
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

      <div id="loginform">
        <div className="suformlogo" >
            <img
            id="suformlogoimage"
            src={require("../../images/Comparalist_rectangle.png")}
            alt="Company Logo"
            />
        </div>
    <form>

    
      <h2 id="signupheadertitle">Create an Account</h2>

      <div className="cufa">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          onChange={handleChange}
        />
      </div>

      <div className="cufa">
        
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          onChange={handleChange}
        />
      </div>
      <div className="cufa">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="At least 6 characters" onChange={handleChange} />
      </div>

      <div className="cufa">
        <label htmlFor="preferred_name">Your Preferred Name:</label>
        <input
          type="text"
          id="preferred_name"
          onChange={handleChange}
        />
      </div>
      <div id="cubuttonwrapper">
        <button id="cubutton" className="cubutton" type="submit" onClick={handleSubmit}>
          Create your ComparaList Account!
      </button>
      </div >
    </form >
    </div>
  );
}

export default SignUpForm;
