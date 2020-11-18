import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../SignUpForm/SignUpForm.css";
import Nav from "../../components/Nav/Nav";


function SignUpForm() {
  //variables
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    preferred_name: "",
    password: "",
    userprofile: {},
  });

  //methods
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const history = useHistory();

  const postData = async () => {
    //function you can call but carry on as well
    const response = await fetch(`${process.env.REACT_APP_API_URL}register/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username != null) {
      console.log(credentials);

      postData().then((response) => {
        history.push("/login");
      });
    }
  };

  return (

      <div className="signupform">

  
        <div className="suformlogo" >
            <img
            id="suformlogoimage"
            src={require("../../images/Comparalist_rectangle.png")}
            alt="Company Logo"
            />
        </div>
    <form>

    
      <h2 id="signupheadertitle">CREATE YOUR COMPARALIST ACCOUNT</h2>

      <div className="sufa">
        <label className="atsu" htmlFor="username">USERNAME:</label>
        <input
          type="text"
          id="username"
          onChange={handleChange}
        />
      </div>

      <div className="sufa">
        
        <label className="atsu" htmlFor="email">EMAIL:</label>
        <input
          type="email"
          id="email"
          onChange={handleChange}
        />
      </div>
      <div className="sufa">
        <label className="atsu" htmlFor="password">PASSWORD:</label>
        <input type="password" id="password" placeholder="At least 6 characters" onChange={handleChange} />
      </div>

      <div className="sufa">
        <label className="atsu" htmlFor="preferred_name">YOUR PREFFERED NAME:</label>
        <input
          type="text"
          id="preferred_name"
          onChange={handleChange}
        />
      </div>
      <div id="subuttonwrapper">
        <button id="subutton" className="subutton" type="submit" onClick={handleSubmit}>
          CREATE ACCOUNT
      </button>
      </div >
    </form >
    </div>
  );
}

export default SignUpForm;
