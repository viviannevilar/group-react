import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";


function EditProfileForm() {

  const [credentials, setCredentials] = useState({
    username: "",
    preferred_name: "",
    email: "",
    
  });
  const [profileData, setProfileData] = useState({});
  const token = window.localStorage.getItem("token");
  const username=window.localStorage.getItem("username");
  const { id } = useParams();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}user/${username}`, {
      method:"get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`}
      }).then((results) => {
        return results.json();
      }).then((data) => {
        console.log(data)
        setProfileData(data);
      });
  }, []);
  

  useEffect(() => {
    setCredentials({
      username: profileData.username,
      email: profileData.email,
      preferred_name: profileData.preferred_name,
      
    });
  }, [profileData]);

  const history = useHistory();
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };
  const putData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}user/${username}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(credentials),
      }
    );
    return response.json();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (true) {
      putData()
        .then((response) => {
          // window.localStorage.setItem("token", response.token);
          history.push(`/`);
      })
      // .catch((error) => {
      //     alert("you haven't filled in all criteria");
    // });
    }
  };
  return (
    <form>
      <div class= "form1-item">
        <label htmlFor="username">Username:</label>
        <input
          type="username"
          id="username"
          value={credentials.username}
          onChange={handleChange}
        />
      </div>
     
      <div class="form1-item">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          onChange={handleChange}
          value={credentials.email}
        />
      </div>
      <div class="form1-item">
        <label htmlFor="preferred_name">Preferred Name:</label>
        <input
          type="preferred_name"
          id="preferred_name"
          onChange={handleChange}
          value={credentials.preferred_name}
        />
      </div>
            
        <button type="submit" onClick={handleSubmit}>
        Edit Profile
        </button>
    </form>
  );
}
export default EditProfileForm;