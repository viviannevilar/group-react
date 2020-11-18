import React, { useState, useEffect } from "react";
import "./HomePage.css";
import "../SignUp/SignUp";
import "../ContactUs/ContactUs";
import "../AboutUs/AboutUs";
import "../LoginPage/LoginPage";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import LogoutForm from "../../components/LogoutForm/LogoutForm";
import { Link } from "react-router-dom";

function HomePage() {
  const [loggedin, setLoggedIn] = useState(false);

  const isAuthenticated = () => {
    let token = window.localStorage.getItem("token");

    if (token != null) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, []);

  return (
    <React.Fragment>
       <Nav myClassName={"hidden-nav"}/>


      <div className="logo1">
        <img
          id="logoimage"
          src={require("../../images/Logo.png")}
          alt="Company Logo"
        />
      </div>

      {loggedin ? (
        <div className="buttons-wrapper">
          <Link to="/collections/" className="button1">
            My Collections
          </Link>
          
          <LogoutForm />
        </div>
      ) : (
        <div className="buttons-wrapper">
          <Link to="/signup" className="button1">
            Sign Up
          </Link>
          <Link to="/login" className="button1">
            Log In
          </Link>
        </div>
      )}

      {/* <Footer /> */}
      {/* <div className="footer">
        <Link className="footer1" to="/contactus">
          CONTACT US
        </Link>
        <Link className="footer1" to="/aboutus">
          ABOUT US
        </Link>
      </div> */}
    </React.Fragment>
  );
}

export default HomePage;
