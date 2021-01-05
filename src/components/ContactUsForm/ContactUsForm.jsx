import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../ContactUsForm/ContactUsForm.css";
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
    <div className="contactusform">

    <div className="cuformlogo" >
            <img
            id="cuformlogoimage"
            src={require("../../images/Comparalist_rectangle.png")}
            alt="Company Logo"
            />
        </div>
    <div>
      <h2 id="contactusheadertitle">CONTACT US</h2>
      <form onSubmit={handleSubmit}>
      <div className="cufa">
        <label className="atcu" htmlFor="name">NAME:</label>
        <input 
          name="username"
          type="text"
          id="name"
          onChange={handleChange}
        />
      </div>
      <div className="cufa">
        <label className="atcu" htmlFor="email">EMAIL:</label>
        <input 
          name="email"
          type="email"
          id="email"
          onChange={handleChange}
        />
      </div>
      <div className="cufa">
        <label className="atcu" htmlFor="message">MESSAGE:</label>
        <textarea className="atcublock" name="message" type="textarea" id="message" rows="8" onChange={handleChange} />
      </div>
      <div id="cubuttonwrapper">
        <button id="cubutton" className="cubutton" type="submit" onClick={handleSubmit}>
          SEND
      </button>
      </div >
    </form >
    </div>
    </div>
  );
};

export default ContactUsForm;
