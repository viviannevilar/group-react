import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";



function Nav(props) {

   const { myClassName } = props

   
   console.log(myClassName)
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
                <Link className={`navItem ${myClassName ? myClassName : null}`} to="/">HOME</Link>
            </div>

            <div className="linkContainer">
                <Link className={`navItem ${myClassName ? myClassName : null}`} to="/edituserdetails">ACCOUNT</Link>
            </div>
            <div className="linkContainer">
                <Link className={`navItem ${myClassName ? myClassName : null}`} to="/collections/">COLLECTIONS</Link>
            </div>
            <div className="linkContainer">
                {isloggedIn ? (<Link className={`navItem ${myClassName ? myClassName : null}`} to="/login" onClick={handleLogout}>LOGOUT</Link>) : (<Link className={`navItem ${myClassName ? myClassName : null}`} to="/login">LOGIN</Link>)}
            </div>
        </nav>
    );
}
export default Nav;
