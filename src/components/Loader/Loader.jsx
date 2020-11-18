import "./Loader.scss"
import React from "react";
//import { Link, useLocation } from "react-router-dom";


function Loader() {



return (
   <div id="loader-wrapper">
      <div class="slinky-loader">
         <div class="slinky-loader__rotator">
            <div class="slinky-loader__bar"></div>
            <div class="slinky-loader__bar"></div>
            <div class="slinky-loader__bar"></div>
            <div class="slinky-loader__bar"></div>
            <div class="slinky-loader__bar"></div>
         </div>
      </div>
   </div>
)

}


export default Loader