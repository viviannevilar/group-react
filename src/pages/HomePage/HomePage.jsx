import React, { useState, useEffect } from "react";
import "./HomePage.css";
import "../SignUp/SignUp";
import "../ContactUs/ContactUs";
import "../AboutUs/AboutUs";
import "../LoginPage/LoginPage";
import { Link } from 'react-router-dom';

function HomePage() {

  return (
    <div className="homepage">

      <div className="logo" >
        <img
          id="logoimage"
          src={require("../../images/Logo.png")}
          alt="Company Logo"
        />
      </div>

      <div className="buttons-wrapper">

        <Link to="/signup" className="button1" >Sign Up</Link>
        <Link to="/login" className="button1" >Log In</Link>
      </div>

      <div className="footer">
        <Link className="footer1" to="/contactus">CONTACT US</Link>
        <Link className="footer1" to="/aboutus">ABOUT US</Link>

      </div>

    </div>
  );

}

export default HomePage