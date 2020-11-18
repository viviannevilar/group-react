import "./Loader.scss"
import React from "react";
//import { Link, useLocation } from "react-router-dom";


function Loader() {



return (
   <div id="loader-wrapper">
      <div className="slinky-loader">
         <div className="slinky-loader__rotator">
            <div className="slinky-loader__bar"></div>
            <div className="slinky-loader__bar"></div>
            <div className="slinky-loader__bar"></div>
            <div className="slinky-loader__bar"></div>
            <div className="slinky-loader__bar"></div>
         </div>
      </div>
   </div>
)

}


export default Loader