import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import "../../components/Nav/Nav.css";


function EditProfileForm() {
  const [modalState, setModalState] = useState(false);
  const [profileData, setProfileData] = useState({});
  const token = window.localStorage.getItem("token");
  const username = window.localStorage.getItem("username");

  const deleteAccountToggleState = () => {
    setModalState(!modalState);
    window.scrollTo(0, 0);
  };

  const [credentials, setCredentials] = useState({
    username: "",
    preferred_name: "",
    email: "",

  });
  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",

  });



  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}user/${username}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    }).then((results) => {
      return results.json();
    }).then((data) => {
      console.log(data)
      setProfileData(data);
    });
  }, []);


  useEffect(() => {
    setCredentials({
      id: profileData.id,
      username: profileData.username,
      email: profileData.email,
      preferred_name: profileData.preferred_name,
      password: profileData.password,

    });
  }, [profileData]);

  const history = useHistory();

  const handleChangeCredentials = (e) => {
    const { id, value } = e.target;
    console.log(id, " ", value)
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };
  const handleChangePasswords = (event) => {
    const { id, value } = event.target;

    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [id]: value,
    }));
  };



  const postData = async () => {
    let username = localStorage.username;
    let token = localStorage.token;

    //function you can call but carry on as well
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}user/${username}/`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(credentials),
      }
    );

    if (response.ok) {
      return response.json();
    } else {
      response.text().then(text => {
        throw Error(text)
      }).catch(
        (error) => {
          const errorObj = JSON.parse(error.message);
          console.log(errorObj);
        }
      )
    }
  };



  const handleSubmitCredential = (e) => {
    e.preventDefault();
    postData()
      .then((response) => {
        if (response != undefined) {
          history.push("/collections/");
        } else {
          history.push("/collections/")
        }
      }).catch(
        (error) => {
          console.log("---- error: ", error)
        }
      )

  };

  const handleSubmitPassword = (e) => {

    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}change-password/`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(passwords)

    })

      .then((result) => {
        if (result != undefined) {
          history.push("/collections/");
          window.location.reload();
        } else {
          history.push("/edituserdetails/")
        }

      }).catch(
        (error) => {
          console.log("error")
        }
      )
  };


  const DeleteAccount = async (e) => {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username");

    const response = fetch(`${process.env.REACT_APP_API_URL}user/${username}/`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    console.log(response)
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
  };


  return (
    <div >
      <div id="Nav">
        <Nav />
      </div>

      {username === null ? (<div>You are not logged in </div>
      ) : (<div>

        <div id="App">
          <form>
            <h2>Edit Profile here</h2>
            <div className="form1-item">
              <label htmlFor="username">Username:</label>
              <input
                type="username"
                id="username"
                value={credentials.username}
                onChange={handleChangeCredentials}
              />
            </div>

            <div className="form1-item">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                onChange={handleChangeCredentials}
                value={credentials.email}
              />
            </div>
            <div className="form1-item">
              <label htmlFor="preferred_name">Preferred Name:</label>
              <input
                type="preferred_name"
                id="preferred_name"
                onChange={handleChangeCredentials}
                value={credentials.preferred_name}
              />
            </div>
            <button type="submit" onClick={handleSubmitCredential}> EditProfile </button>
            <h2>Edit Password here</h2>
            <div className="form1-item">
              <label htmlFor="old_password">Old Password:</label>
              <input
                type="old_password"
                id="old_password"
                onChange={handleChangePasswords}
                value={passwords.old_password}
              />
            </div>

            <div className="form1-item">
              <label htmlFor="new_password">New Password:</label>
              <input
                type="new_password"
                id="new_password"
                onChange={handleChangePasswords}
                value={passwords.new_password}
              />
            </div>

            <button type="submit" onClick={handleSubmitPassword}> Change Password </button>

            <h2>Delete Account here</h2>
            <div className="form1-item">
              <label htmlFor="delete_account"></label>


            </div>



          </form>
          <button className="button" onClick={() => deleteAccountToggleState()}>Delete your Account</button>

        </div>

        <div className={`modalBackground modalShowing-${modalState}`}>
          <div className="modalInner">
            <div className="modalText">
              <p>Are you sure you want to delete your account? - This will remove all collection and item Data</p>
              <button onClick={() => DeleteAccount()}>Yes Delete Account</button>
              <div>
                <button className="exitButton" onClick={() => deleteAccountToggleState()}> exit </button>
              </div>
            </div>
          </div>
        </div>

      </div>)}


    </div>
  );
}
export default EditProfileForm;