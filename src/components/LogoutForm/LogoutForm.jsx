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

  return (
    <div>
      <button className="buttonupdate" onClick={handleSubmit}>Logout</button>
    </div>
  );
}

export default LogoutForm;
