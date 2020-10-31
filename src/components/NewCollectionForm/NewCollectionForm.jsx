import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./NewCollectionForm.css";
// import "../../components/CollectionCard/CollectionCard.css";

function NewCollectionForm() {
    const [error, setError] = useState();

  //variables
  const [credentials, setCredentials] = useState({
    date_created: "",
    title: "",
    attribute1: "",
    attribute2: "",
    attribute3: "",
    attribute4: "",
    attribute5: "",
    is_active: true,
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
    let token = window.localStorage.getItem("token");

    //function you can call but carry on as well
    const response = await fetch(`${process.env.REACT_APP_API_URL}collections/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      return response.json();
    } else {
      response.text().then(text => {
        throw Error(text)
      }).catch(
        (error) => {
          const errorObj = JSON.parse(error.message);
          console.log(errorObj)
          setError(errorObj);
        }
      )
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postData().then((response) => {
      if (response != undefined) {
        history.push("/")
      } else {
        history.push("/collection-create") 
        // not sure about whether this should just be collection????????
      }
    }).catch(
      (error) => {
        console.log("error")
      }
    )

  };

  return (
    <div id="collectionform">
      <h2 id="headerTitle"> Create a new collection! </h2>

      <form>
        <div className="thra">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="What is the title of your collection?"
            onChange={handleChange}
            required
          />
        </div>

        <div className="thra">
          <label htmlFor="attribute1">Attribute 1:</label>
          <textarea
            type="textarea"
            id="attribute1"
            placeholder="Pick an attribute you would lilke to use to compare items"
            onChange={handleChange}
          />
        </div>

        <div className="thra">
          <label htmlFor="attribute2">Attribute 2:</label>
          <textarea
            type="textarea"
            id="attribute2"
            placeholder="Pick an attribute you would lilke to use to compare items"
            onChange={handleChange}
          />
        </div>

        <div className="thra">
          <label htmlFor="attribute3">Attribute 3:</label>
          <textarea
            type="textarea"
            id="attribute3"
            placeholder="Pick an attribute you would lilke to use to compare items"
            onChange={handleChange}
          />
        </div>

        <div className="thra">
          <label htmlFor="attribute4">Attribute 4:</label>
          <textarea
            type="textarea"
            id="attribute4"
            placeholder="Pick an attribute you would lilke to use to compare items"
            onChange={handleChange}
          />
        </div>
    
        <div className="thra">
          <label htmlFor="attribute5">Attribute 5:</label>
          <textarea
            type="textarea"
            id="attribute5"
            placeholder="Pick an attribute you would lilke to use to compare items"
            onChange={handleChange}
          />
        </div>

        <div className="thra">
          <label htmlFor="is_active">Is this Project Active on submission of this form?:</label>
        </div>
        <div className="radiowrapper">
          <input
            type="radio"
            id="is_open"
            name="is_open"
            value="true"
            onChange={handleChange}
          />
          <label htmlFor="is_open">Open</label>
          <input
            type="radio"
            id="is_open"
            name="is_open"
            value="false"
            onChange={handleChange}
          />
          <label htmlFor="false">Closed</label>
        </div>



        <div className="buttonwrapper">
          <button className="collectionbutton" type="submit" onClick={handleSubmit}>
            Submit your Collection!
      </button>
          <br></br>
          <br></br>

        </div>
      </form>
      {
        error && (
          <div>
            {
              Object.keys(error).map((key, index) => (
                <p key={index}> Error for: {key} -  {error[key]}</p>
              ))
            }
          </div>
        )
      }
    </div >
  );
}

export default NewCollectionForm;
