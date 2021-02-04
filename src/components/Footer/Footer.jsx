import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import "./Nav.css";

function Footer(props) {
  const [isloggedIn, setisloggedin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setisloggedin(true) : setisloggedin(false);
  }, [location]);

  const handleLogout = () => {
    window.localStorage.clear();
  };

  //const { image } = props;

  return (
    <div className="footer">
      <div className="linkContainer">
        <Link className="navItem" to="/aboutus">ABOUT US</Link>
      </div>

      <div className="linkContainer">
        <Link className="navItem" to="/contactus">CONTACT US</Link>
      </div>
    </div>
  );
}

export default Footer;
