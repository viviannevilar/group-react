import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./ErrorComponent.css";



function ErrorComponent(props) {

    const { errorMessage, errorNumber } = props;

    return (

        <div className="ErrorMessageContainer">
            <h1>{errorNumber}</h1>
            <h1>{errorMessage}</h1>
        </div>

    );
}
export default ErrorComponent;
