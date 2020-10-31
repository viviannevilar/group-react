import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../images/Logo.png";

function Header() {
  return (
    <Link className="header" to="/">
      <img className="logo" src={Logo} alt="logo" />
    </Link>
  );
}

export default Header;