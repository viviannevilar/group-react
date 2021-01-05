import React from "react";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <div>
      <div className="c">
        <div className="_404">404</div>
        <div className="_1">THE PAGE</div>
        <br></br>
        <div className="_2">WAS NOT FOUND</div>
        <br></br>
        <br></br>
        <a className="btn" href="../">
          BACK TO HOMEPAGE
        </a>
      </div>
    </div>
  );
}

export default NotFoundPage;
