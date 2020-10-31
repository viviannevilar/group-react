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
          <div className="logo" style={{flex:1}}>
            <img
            id="logoimage"
            src={require("../../images/Logo.png")}
            alt="Company Logo"
          />
          </div>
          <div className="buttons">
            <Link to="/signup" id="button" className="button">Sign Up</Link>
            <Link to="/login" id="button" className="button">Log In</Link>
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