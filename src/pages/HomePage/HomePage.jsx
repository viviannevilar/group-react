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
          <img
            id="logo"
            src={require("../../images/Logo.png")}
            alt="Company Logo"
          />
          <div className="buttons">
            <Link to="/signup">Sign Up</Link>;
            <Link to="/login">Log In</Link>;
          </div>   
          <div className="footer">
            <Link to="/contactus">Contact Us</Link>;
            <Link to="/aboutus">About Us</Link>;
          </div>   
                    
        </div>
    );
}



export default HomePage