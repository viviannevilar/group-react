
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../Nav/Nav";
import "../../components/Nav/Nav.css";
import "./EditCollectionForm.css";
//import ContactUsPage from "../../pages/ContactUs/ContactUs";

function EditCollectionForm(props) {

    //variables
    const { collectionData } = props;

    let btnRefAdd = useRef();

    const [errorMessage, setErrorMessage] = useState()
    const [errorKey, setErrorKey] = useState()

    const [credentials, setCredentials] = useState({
        id: null,
        title: "",
        attribute1: "",
        attribute2: "",
        attribute3: "",
        attribute4: "",
      //   is_active: true,
    });


    //methods

    useEffect(() => {

      setCredentials({
          id: parseInt(collectionData.id),
          title: collectionData.title,
          attribute1: collectionData.attribute1,
          attribute2: collectionData.attribute2,
          attribute3: collectionData.attribute3,
          attribute4: collectionData.attribute4,
          // is_active: collectionData.is_active,
      });
  }, [collectionData]);


    const handleChange = (e) => {

        const { id, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };


    const handleImageChange = (e) => {
        e.persist();

        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            image: e.target.files[0],
        }));
    };

    const history = useHistory();

    const postData = async () => {
        let token = window.localStorage.getItem("token");

        let form_data = new FormData();
        form_data.append('attribute1', credentials.attribute1);
        form_data.append('attribute2', credentials.attribute2);
        form_data.append('attribute3', credentials.attribute3);
        form_data.append('attribute4', credentials.attribute4);    
        form_data.append('title', credentials.title);

        //function you can call but carry on as well
        const response = await fetch(`${process.env.REACT_APP_API_URL}collection/${collectionData.id}/`, {
            method: "put",
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: form_data,
            // body: JSON.stringify(credentials),
        });

         if (response.ok) {
            history.push(`/collection/${collectionData.id}/`);
            return response.json();

         } else {

         response.text().then(text => {
            throw Error(text)

         }).catch((error) => {
           //setHasError(true)
           const errorObj = JSON.parse(error.message);
             setErrorKey(Object.keys(errorObj)[0])
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
            // console.log(response)
            // history.push(`/collection/${collectionData.id}/`);
            // window.location.reload();
        });

    };

    const cancelSubmit = (e) => {
      history.push(`/collections/`);
      }



    return (
        <div>
        
            <div className="ecformlogo" >
                <img
                id="ecformlogoimage"
                src={require("../../images/Comparalist_rectangle.png")}
                alt="Company Logo"
                />
            </div>
    
        <div className="editcollectionform">

            <h2 id="editcollectionheadertitle"> Edit {collectionData.title} </h2>

            <h4 className="newcollectiontxt"><span className="error">{ (errorKey === "detail") ? errorMessage : null}</span> </h4>

            <form>

                <div className="ecfa">
                    <label className="ate" htmlFor="title">
                       Name of Collection:
                       <span className="error">{ (errorKey === "title") ? errorMessage : null}</span> 
                       </label>
                    <textarea
                        type="textarea"
                        id="title"
                        value={credentials.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="ecfa">
                    <label className="ate" htmlFor="attribute1">Attribute 1:
                    <span className="error">{ (errorKey === "attribute1") ? errorMessage : null}</span> 
                    </label>
                    <textarea
                        type="textarea"
                        id="attribute1"
                        value={credentials.attribute1}
                        onChange={handleChange}
                    />
                </div>



                <div className="ecfa">
                    <label className="ate" htmlFor="attribute2">Attribute 2:
                    <span className="error">{ (errorKey === "attribute2") ? errorMessage : null}</span> 
                    </label>
                    <textarea
                        type="textarea"
                        id="attribute2"
                        value={credentials.attribute2}
                        onChange={handleChange}
                    />
                </div>

                <div className="ecfa">
                    <label className="ate" htmlFor="attribute3">Attribute 3:
                    <span className="error">{ (errorKey === "attribute3") ? errorMessage : null}</span> 
                    </label>
                    <textarea
                        type="textarea"
                        id="attribute3"
                        value={credentials.attribute3}
                        onChange={handleChange}
                    />
                </div>

                <div className="ecfa">
                    <label className="ate" htmlFor="attribute4">Attribute 4:
                    <span className="error">{ (errorKey === "attribute4") ? errorMessage : null}</span> 
                    </label>
                    <textarea
                        type="textarea"
                        id="attribute4"
                        value={credentials.attribute4}
                        onChange={handleChange}
                    />
                </div>



                {/* <div className="ecfa">
                    <label className="ate" htmlFor="is_open">Would you like to archive this Collection and come back to it later?</label>

                </div> */}

                {/* <div className="ecradiowrapper">
                   <label>
                    <input
                        type="radio"
                        id="is_active"
                        name="is_active"
                        value="true"
                        checked={credentials.is_active === true || "true"} 
                        onChange={handleChange}
                    />
                    Active</label>

                     <label>
                    <input
                        type="radio"
                        id="is_active"
                        name="is_active"
                        value="false"
                        checked={credentials.is_active === (false || "false")}
                        onChange={handleChange}
                    />
                    Archived</label>
                </div> */}
                <br></br>

                <div className="ecbuttonwrapper">
                    <button className="ecbutton" ref={btnRefAdd} type="submit" onClick={handleSubmit}>  Update Collection </button>
                    <br></br>
                    <button className="ecbutton" type="submit" onClick={cancelSubmit}>  Cancel </button>
                </div>
                <br></br>
                <br></br>
            </form>
        </div>
        </div>
    );
}

export default EditCollectionForm;
