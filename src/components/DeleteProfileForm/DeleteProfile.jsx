import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function DeleteProfile() {
  const history = useHistory();
  const handleSubmit = (e) => {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username");
    fetch(`${process.env.REACT_APP_API_URL}users/${username}/`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
  };

  return (
    <button onClick={handleSubmit}>Delete Account</button>
  );
}

export default DeleteProfile;
