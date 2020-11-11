import React, { useEffect, useState } from "react";
import { Link , useLocation } from "react-router-dom"; 
import "./Nav.css";



function Nav(props) {
    const [isloggedIn, setisloggedin] = useState(false);
    const location = useLocation();
    
    useEffect(() => {
      const token = window.localStorage.getItem("token");
      token != null ? setisloggedin(true) : setisloggedin(false);
    }, [location]);

    const handleLogout = () => {
      window.localStorage.clear();
    };
    
    const { image } = props;

    return (

            <nav className="Navbarcontainer">
                <Link id="Navitem" to="/">Home</Link>
                {isloggedIn ? (
                    <Link id="Navitem" to="/login" onClick={handleLogout}>
                    Logout
                    </Link>
                ) : (
                    <Link to="/login">Login</Link>
                )}
                <Link id="Navitem" to="/edituserdetails">Account</Link>
                <Link id="Navitem" to="/collections/">Collections</Link>
            </nav>
      );
    }
    export default Nav;
