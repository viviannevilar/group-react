import React from "react";
import "./AboutUs.css";
           

function AboutUsPage(){
    return (
        <div className="aboutus">
            <h1 id="about">We Love Comparing!</h1>
            <p>At ComparaList, we understand that making everyday life decisions such as buying a fridge, car or furniture can be daunting. That's why we're here:)</p>
            <p>Our goal is to help people on the go to easily note and compare different options for the same item. The end goal is to help you make better decisions.
            </p>
            <h1 id="about">How to use it!</h1>
            <p>It is personal use app, which allows you to easily compare and contrast different options for the same item.
            For this purpose, you first need to create an account, then you will be able to create a list, name it and add your items. </p>
            <p>You can add five attributes as well as uploading image to the list, so you need to narrow down what matters most to you.</p>
            <p>The items are editable and after you made your decision, you can archive your collections for future use or delete it.</p>
            <h1 id="about">We Love hearing from you!</h1>
            <p>We hope you enjoy our website, as much as we enjoyed creating it for you. If you have any questions or comments, please don't hesitate to <a href="./ContactUs">contact us</a></p>

        </div>
    ) 
}

export default AboutUsPage