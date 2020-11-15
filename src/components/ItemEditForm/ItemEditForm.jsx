import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import "../../components/Nav/Nav.css";
import "./ItemEditForm.css";
function ItemEditForm(props) {

    //variables
    const { itemData, collectionData } = props;

    const [errorMessage, setErrorMessage] = useState()
    const [errorKey, setErrorKey] = useState()
    const [hasError, setHasError] = useState(false)

    let btnRefAdd = useRef();

    const [credentials, setCredentials] = useState({
        id: null,
        name: "",
        price: "",
        sale_amount: 0,
        sale_end_date: null,
        attribute1: "",
        attribute2: "",
        attribute3: "",
        attribute4: "",
        image: "",
        notes: "",
        collection: null,
    });


    //  Populate the form with previous data
    useEffect(() => {
        console.log(itemData)
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            id: parseInt(itemData.id),
            name: itemData.name,
            sale_amount: itemData.sale_amount,
            sale_end_date: itemData.sale_end_date,
            price: itemData.price,
            attribute1: itemData.attribute1,
            attribute2: itemData.attribute2,
            attribute3: itemData.attribute3,
            attribute4: itemData.attribute4,
            notes: itemData.notes,
            collection: parseInt(itemData.collection),
        }));
        console.log(credentials)


    }, [itemData]);


    //methods
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
        form_data.append('image', credentials.image);
        form_data.append('attribute1', credentials.attribute1);
        form_data.append('attribute2', credentials.attribute2);
        form_data.append('attribute3', credentials.attribute3);
        form_data.append('attribute4', credentials.attribute4);
        form_data.append('collection', credentials.collection);
        form_data.append('name', credentials.name);
        form_data.append('price', credentials.price);
        form_data.append('notes', credentials.notes);      
        form_data.append('sale_amount', credentials.sale_amount);
        if (credentials.sale_end_date !== null) {
            form_data.append('sale_end_date', credentials.sale_end_date);
        }

        //function you can call but carry on as well
        const response = await fetch(`${process.env.REACT_APP_API_URL}item/${itemData.id}/`, {
            method: "put",
            headers: {
                Authorization: `Token ${token}`,
            },
            body: form_data,
        });
        console.log(response)

        if (response.ok) {
         // setErrorMessage("Item Created! Create another?")
         // setErrorKey("detail")
         history.push(`/collection/${itemData.collection}/`);
         window.location.reload();

      } else {
         response.text().then(text => {
               throw Error(text)
         }).catch(
               (error) => {
                  // this catches the error in a dictionary
                  // the key gives the key of the element that has a problem
                  // and the value gives gives the string with the error message
                  // then focus on the input of the element that has a problem

                  setHasError(true)
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
      //return response.json();


    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handlesubmit")
        console.log(credentials);
         
        //disables the button to submit form until there is a response
         if (btnRefAdd.current) {
            btnRefAdd.current.disabled = true
         }
        postData().then((response) => {
            console.log(response)
            //history.push(`/collection/${collectionData.id}/`);
            // window.location.reload();
        });

    };

   const cancelSubmit = (e) => {
   history.push(`/collection/${collectionData.id}/`);
   }



   return (
      <div>
          <div>
              <Nav />
          </div>
          <div className="eiformlogo" >
              <img
              id="eiformlogoimage"
              src={require("../../images/Comparalist_rectangle.png")}
              alt="Company Logo"
              />
          </div>
      <div id="edititemform">

          <h2 id="edititemheadertitle"> Edit Item in {collectionData.title} </h2>

          <h4><span className="error">{ (errorKey === "detail") ? errorMessage : null}</span> </h4>

          <form>

              <div className="eifa">
                  <label className="atei" htmlFor="name">
                     Name of Item:
                  <span className="error">{ (errorKey === "name") ? errorMessage : null}</span> 
                  </label>
                  <input
                      type="text"
                      id="name"
                      value={credentials.name}
                      onChange={handleChange}
                  />
              </div>


              <div className="eifa">
                  <label className="atei" htmlFor="price">
                     Price of Item:
                     <span className="error">{ (errorKey === "price") ? errorMessage : null}</span> 
                     </label>
                  <input
                      type="number"
                      id="price"
                      onChange={handleChange}
                      value={credentials.price}

                  />
              </div>


              <div className="eifa">
                  <label className="atei" htmlFor="sale_amount">
                     Is there a discount currently offered (%)?:
                     <span className="error">{ (errorKey === "sale_amount") ? errorMessage : null}</span> 
                     </label>
                  <input
                      type="number"
                      id="sale_amount"
                      onChange={handleChange}
                      value={credentials.sale_amount}

                  />
              </div>


              {parseInt(credentials.sale_amount) > 0 && (<div className="eifa">
                  <label className="atei" htmlFor="sale_end_date">
                     When does the discount expire?
                     <span className="error">{ (errorKey === "sale_end_date") ? errorMessage : null}</span> 
                     </label>
                  <input
                      type="date"
                      id="sale_end_date"
                      value={credentials.sale_end_date}
                      onChange={handleChange}
                  />
              </div>)}

              {collectionData.attribute1 !== "" && (<div className="eifa">
                  <label className="atei" htmlFor="attribute1">
                     {collectionData.attribute1}:
                     <span className="error">{ (errorKey === "attribute1") ? errorMessage : null}</span>
                  </label>
                  <input
                      type="text"
                      id="attribute1"
                      value={credentials.attribute1}
                      onChange={handleChange}
                  />
              </div>)}



              {collectionData.attribute2 !== "" && (<div className="eifa">
                  <label className="atei" htmlFor="attribute2">
                     {collectionData.attribute2}:
                     <span className="error">{ (errorKey === "attribute2") ? errorMessage : null}</span> 
                  </label>
                  <input
                      type="text"
                      id="attribute2"
                      value={credentials.attribute2}
                      onChange={handleChange}
                  />
              </div>)}

              {collectionData.attribute3 !== "" && (<div className="eifa">
                  <label className="atei" htmlFor="attribute3">
                     {collectionData.attribute3}:
                     <span className="error">{ (errorKey === "attribute3") ? errorMessage : null}</span>    
                  </label>
                  <input
                      type="text"
                      id="attribute3"
                      value={credentials.attribute3}
                      onChange={handleChange}
                  />
              </div>)}

              {collectionData.attribute4 !== "" && (<div className="eifa">
                  <label className="atei" htmlFor="attribute4">
                     {collectionData.attribute4}:
                     <span className="error">{ (errorKey === "attribute4") ? errorMessage : null}</span> 
                     </label>
                  <input
                      type="text"
                      id="attribute4"
                      value={credentials.attribute4}
                      onChange={handleChange}
                  />
              </div>)}



              <div className="eifa">
                  <label className="atei" htmlFor="image">
                     Image:
                     <span className="error">{ (errorKey === "image") ? errorMessage : null}</span>    
                  </label>
                  <br></br>
                  <div id="imagecon">
                      <img id="image" src={credentials.image} alt="anon pic" />
                  </div>
                  <br></br>
                  <input
                      type="file"
                      id="image"
                      onChange={handleImageChange}
                  />
              </div>


              <div className="eifa">
                  <label className="atei" htmlFor="notes">
                     Notes:
                     <span className="error">{ (errorKey === "notes") ? errorMessage : null}</span> 
                  </label>
                  <input
                      type="textarea"
                      id="notes"
                      value={credentials.notes}
                      onChange={handleChange}
                  />
              </div>




              <div className="eibuttonwrapper">
                  <button className="eibutton" ref={btnRefAdd} type="submit" onClick={handleSubmit}>  Update Item </button>
                  <button className="eibutton" type="submit" onClick={cancelSubmit}>  Cancel </button>
              </div>
          </form>
      </div>
      </div>
  );
}

export default ItemEditForm;
