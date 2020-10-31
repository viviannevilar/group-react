import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./HomePage.css";
import "../SignUp/SignUp";
import "../ContactUs/ContactUs";
import "../AboutUs/AboutUs";
import "../LoginPage/LoginPage";
import { Link } from 'react-router-dom';

function HomePage() {

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    preferred_name: "",
    password: "",
    userprofile: {},
  });

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
        <div className="homepage">
          <div className="logo" style={{flex:1, backgroundColor:"pink"}}>
            <img
            id="logoimage"
            src={require("../../images/Logo.png")}
            alt="Company Logo"
          />
          </div>
          <div className="buttons">
            <Link to="/signup">
            <button id="button" className="button" type="submit" onClick={handleSubmit}>
            Sign Up!
            </button>
            </Link>
            <Link to="/login">
            <button id="button" className="button" type="submit" onClick={handleSubmit}>
            Log In!
            </button>
            </Link>
          </div>   
          <div className="footer">
            <Link to="/contactus">Contact Us</Link>
            <span> | </span>
            <Link to="/aboutus">About Us</Link>
          </div>   
        </div>
    );
}



export default HomePage