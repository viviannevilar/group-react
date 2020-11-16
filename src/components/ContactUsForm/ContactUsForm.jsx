import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../ContactUsForm/ContactUsForm.css";
import Nav from "../../components/Nav/Nav";
import "../../components/Nav/Nav.css";

function ContactUsForm() {
  //variables
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    message: "",
  });

  console.log(credentials);

  const history = useHistory();

    const handleChange = (e) => {
      const { name, value } = e.target
      console.log(name, value);
      setCredentials(() => ({
        ...credentials,
        [name]: value,
        })
      )}
    
      const postData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}api-token-auth/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        return response.json();
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username &&
          credentials.email &&
          credentials.message) {
         postData().then((response) => {
           window.localStorage.setItem("token", response.token);
           history.push("/");
         });
       }
     };
  
  return (
    <div id="loginform">
    <div>
        <Nav />
    </div>
    <div>
      <h2 id="headerTitle">Contact Us</h2>
      <form onSubmit={handleSubmit}>
      <div className="row">
        <label htmlFor="name">Name:</label>
        <input
          name="username"
          type="text"
          id="name"
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          id="email"
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <label htmlFor="message">Message:</label>
        <input name="message" type="text" id="message" onChange={handleChange} />
      </div>
      <div id="test">
        <button id="button" className="button" type="submit" onClick={handleSubmit}>
          Send!
      </button>
      </div >
    </form >
    </div>
    </div>
  );
};

export default ContactUsForm;
