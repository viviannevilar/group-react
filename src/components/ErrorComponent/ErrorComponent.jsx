import React from "react";
import "./ErrorComponent.css";

function ErrorComponent(props) {
  const { errorMessage, errorNumber } = props;

  return (
    <div className="c">
      <div className="ErrorMessageContainer">
        {/* <img
          id="logoimage"
          src={require("../../images/LogoCrop.png")}
          alt="Company Logo"
        /> */}
        <div className="_404">{errorNumber}</div>
        <br></br>
        <div className="_1">{errorMessage}</div>
      </div>
    </div>
  );
}
export default ErrorComponent;
