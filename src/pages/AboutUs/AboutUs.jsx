import React from "react";
import "./AboutUs.css";
import Nav from "../../components/Nav/Nav";
           

function AboutUsPage(){
    return (
        <div id="Nav">
        <div>
            <Nav />
        </div>
        <div className="aboutus">
            <h1 id="about">We Love Comparing!</h1>
            <p>We understand that making everyday life decisions such as buying a fridge, car or furniture can be daunting. That's why we're here:)</p>
            <p>Our goal is to help people on the go to easily note and compare different options for the same item. The end goal is to help you make better decisions.
            </p>
        </div>
        </div>
    ) 
}

export default AboutUsPage