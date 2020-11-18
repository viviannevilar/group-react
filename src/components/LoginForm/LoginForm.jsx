import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import "../LoginForm/LoginForm.css";

function LoginForm() {
  //variables
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState();

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
    const response = await fetch(`${process.env.REACT_APP_API_URL}api-token-auth/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
    if (response.ok) {
      return response.json();
    } else {
      response.text().then(text => {
        throw Error(text)
      }).catch(
        (error) => {
          const errorObj = JSON.parse(error.message);
          setError(errorObj.non_field_errors[0]);
        }
      )
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      postData().then((response) => {
        if (response !== undefined) {
          if (response.token !== null || response != null) {
            window.localStorage.setItem("token", response.token);
            window.localStorage.setItem("username", credentials.username);
            history.push("/collections/");
            window.location.reload();
          } else {
            history.push("/login");
          }
        }
      }).catch(
        (error) => {
          console.log("error")
        }
      )


    }
  };

  return (

    <div className="loginform">

      <div className="liformlogo" >
            <img
            id="liformlogoimage"
            src={require("../../images/Comparalist_rectangle.png")}
            alt="Company Logo"
            />
        </div>
      <form>
      <h2 id="loginformheadertitle">LOGIN</h2>
      
        <div className="lifa">
          <label className="atli" htmlFor="username">USERNAME:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            onChange={handleChange}
          />
        </div>
        <div className="lifa">
          <label className="atli" htmlFor="password">PASSWORD:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />
        </div>
        <div id="libuttonwrapper">
          <button id="libutton" className="libutton" type="submit" onClick={handleSubmit}>
            LOGIN
      </button>
        </div>
      </form>

      <div id="libuttonwrapper">
        <div className="litext"> DON'T HAVE AN ACCOUNT? SIGN UP </div> <div id="linky"><Link to={`/signup/`}>{`  HERE`} </Link></div>
      </div>

      {
        error && (
          <div id="errordiv">
            {error}
          </div>
        )
      }

    </div >
    

  );
}

export default LoginForm;
