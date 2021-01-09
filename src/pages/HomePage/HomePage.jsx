import React, { useState, useEffect } from "react";
import "./HomePage.css";
import "../SignUp/SignUp";
import "../ContactUs/ContactUs";
import "../AboutUs/AboutUs";
import "../LoginPage/LoginPage";
import Footer from "../../components/Footer/Footer";
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
    <div id="homepage-wrapper">
      {/* <Nav myClassName={"hidden-nav"}/> */}

      <div className="logo">
        <img
          id="logoimage"
          src={require("../../images/LogoCrop.png")}
          alt="Company Logo"
        />
      </div>

      {loggedin ? (
        <div className="buttons-wrapper">
          <Link to="/collections/" className="button-home">
            My Collections
          </Link>

          <LogoutForm />
        </div>
      ) : (
        <div className="buttons-wrapper">
          <Link to="/signup" className="button-home">
            Sign Up
          </Link>
          <Link to="/login" className="button-home">
            Log In
          </Link>
        </div>
      )}

      <Footer />
      {/* <div className="footer">
        <Link className="footer1" to="/contactus">
          CONTACT US
        </Link>
        <Link className="footer1" to="/aboutus">
          ABOUT US
        </Link>
      </div> */}
    </div>
  );
}

export default HomePage;
