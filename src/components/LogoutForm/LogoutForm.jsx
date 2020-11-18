import React from "react";
import { useHistory } from "react-router-dom";
import "../../components/LogoutForm/LogoutForm.css";

function LogoutForm() {
  const history = useHistory();

  const handleSubmit = (e) => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
  };

  return ( <button className="button1" onClick={handleSubmit}>Logout</button> );
}

export default LogoutForm;
