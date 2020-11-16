import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./NewCollectionForm.css";
import "../../components/Nav/Nav.css";
import Nav from "../../components/Nav/Nav";
// import "../../components/CollectionCard/CollectionCard.css";

function NewCollectionForm() {

     //variables
    const [error, setError] = useState();
    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState()
    const [errorKey, setErrorKey] = useState()
    //const [hasError, setHasError] = useState(false)
 
    let btnRefAdd = useRef();

    const [credentials, setCredentials] = useState({
    date_created: "",
    title: "",
    attribute1: "",
    attribute2: "",
    attribute3: "",
    attribute4: "",
   //  is_active: true,
  });

  //methods
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };



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
       history.push("/collections/")
      return response.json();
    } else {
      response.text().then(text => {
        throw Error(text)
      }).catch(
        (error) => {
         //setHasError(true)
         const errorObj = JSON.parse(error.message);

         // this is the form element that has the problem (eg, "price")
         setErrorKey(Object.keys(errorObj)[0])
         // this is the message of the error (eg, "this field is required")
         setErrorMessage(errorObj[Object.keys(errorObj)[0]]);
         
         // Puts the cursor in the form input corresponding to the element that has an issue
         let keyName = document.getElementById(`${Object.keys(errorObj)[0]}`)
         if (keyName) {keyName.focus();}

         // this enables the submit button again
         if (btnRefAdd.current) {
            btnRefAdd.current.disabled = false
         }
        }
      )
    }

  };

   const handleSubmit = (e) => {
      e.preventDefault();

      //disables the button to submit form until there is a response
      if (btnRefAdd.current) {
         btnRefAdd.current.disabled = true
      }

      postData().then((response) => {
         if (response != undefined) {
         
         } else {
         //history.push("/newcollection/") 
         // not sure about whether this should just be collection????????
         }
      })
   };



  const cancelSubmit = (e) => {
   history.push(`/collections/`);
   }

  return (
    <div>
        <div>
            <Nav />
        </div>
        <div className="ncformlogo" >
            <img
            id="ncformlogoimage"
            src={require("../../images/Comparalist_rectangle.png")}
            alt="Company Logo"
            />
        </div>

    
        <div className="newcollectionform">
            <h2 id="newcollectionheadertitle"> Create a new collection! </h2>
            <br></br>
            <h4 className="newcollectiontxt">Your items will automatically include the following attributes: <br/> Price, Sale Price, Date Sale Price Ends and Image. </h4>
            <h4 className="newcollectiontxt"><span className="error">{ (errorKey === "detail") ? errorMessage : null}</span> </h4>
        </div>
      <form>
        <div className="ncfa">
          <label className="at" htmlFor="title">Title:
          <span className="error">{ (errorKey === "title") ? errorMessage : null}</span> 
          </label>
          <textarea 
            type="textarea"
            id="title"
            placeholder="What is the title of your collection?"
            onChange={handleChange}
            required
          />
        </div>

        <div className="ncfa">
          <label className="at" htmlFor="attribute1">Attribute 1:
          <span className="error">{ (errorKey === "attribute1") ? errorMessage : null}</span> 
          </label>
          <textarea 
            type="textarea"
            id="attribute1"
            placeholder="Pick an attribute you would lilke to use to compare items"
            onChange={handleChange}
          />
        </div>

        <div className="ncfa">
          <label className="at" htmlFor="attribute2">Attribute 2:
          <span className="error">{ (errorKey === "attribute2") ? errorMessage : null}</span> 
          </label>
          <textarea
            type="textarea"
            id="attribute2"
            placeholder="Pick an attribute you would lilke to use to compare items"
            onChange={handleChange}
          />
        </div>

        <div className="ncfa">
          <label className="at" htmlFor="attribute3">Attribute 3:
          <span className="error">{ (errorKey === "attribute3") ? errorMessage : null}</span> 
          </label>
          <textarea
            type="textarea"
            id="attribute3"
            placeholder="Pick an attribute you would lilke to use to compare items"
            onChange={handleChange}
          />
        </div>

        <div className="ncfa">
          <label className="at" htmlFor="attribute4">Attribute 4:
          <span className="error">{ (errorKey === "attribute4") ? errorMessage : null}</span> 
          </label>
          <textarea
            type="textarea"
            id="attribute4"
            placeholder="Pick an attribute you would lilke to use to compare items"
            onChange={handleChange}
          />
        </div>

        {/* <div className="ncfa">
          <label className="at" htmlFor="is_active">Is this Project Active on submission of this form?</label>
        </div>
        <div className="ncradiowrapper">
          <input
            type="radio"
            id="is_open"
            name="is_open"
            value="true"
            onChange={handleChange}
          />
          <label htmlFor="is_open">Active</label>
          <input
            type="radio"
            id="is_open"
            name="is_open"
            value="false"
            onChange={handleChange}
          />
          <label htmlFor="false">Archived</label>
        </div> */}
        <br></br>

        <div className="ncbuttonwrapper">
          <button className="newcollectionbutton" type="submit" onClick={handleSubmit}>
            Submit your Collection!
      </button>
      <br></br>
      <button className="newcollectionbutton" type="submit" onClick={cancelSubmit}>  Cancel </button>
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
