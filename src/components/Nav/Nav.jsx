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
    
    //const { image } = props;

    return (

            <nav className="Navbarcontainer">
                <div className="linkContainer">
                    <Link className="navItem" to="/">HOME</Link>
                </div>
                <div className="linkContainer">
                    {isloggedIn ? ( <Link id="Navitem1" className="navItem" to="/login" onClick={handleLogout}>LOGOUT</Link> ) : (<Link to="/login">LOGIN</Link>)}
                </div>
                <div className="linkContainer">
                    <Link className="navItem" to="/edituserdetails">ACCOUNT</Link>
                </div>
                <div className="linkContainer">
                    <Link className="navItem" to="/collections/">COLLECTIONS</Link>
                </div>
            </nav>
      );
    }
    export default Nav;
