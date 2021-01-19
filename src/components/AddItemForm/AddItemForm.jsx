import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./AddItemForm.css"
// import Nav from "../../components/Nav/Nav";
// import "../../components/Nav/Nav.css";



function AddItemForm(props) {
   const { id, collectionData } = props;
   const [errorMessage, setErrorMessage] = useState()
   const [errorKey, setErrorKey] = useState()
   //const [hasError, setHasError] = useState(false)

   let btnRefAdd = useRef();

   //variables
   const [credentials, setCredentials] = useState({
      name: "",
      price: "",
      attribute1: "",
      attribute2: "",
      attribute3: "",
      attribute4: "",
      image: "",
      sale_amount: 0,
      sale_end_date: null,
      notes: "",
      collection: parseInt(id),
   });


   //methods
   const handleChange = (e) => {
      const { id, value } = e.target;
      setCredentials((prevCredentials) => ({
         ...prevCredentials,
         [id]: value,
      }));
      //console.log(e.target)
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
      setErrorKey()
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
      form_data.append('sale_amount', credentials.sale_amount);
      form_data.append('notes', credentials.notes);

      if (credentials.sale_end_date !== null && parseInt(credentials.sale_amount) !== 0) {
         form_data.append('sale_end_date', credentials.sale_end_date);
      }
      form_data.append('is_active', true);

      console.log("form_data: ", form_data)

      const response = await fetch(`${process.env.REACT_APP_API_URL}collection/${credentials.collection}/items/`, {
         method: "post",
         headers: {
               Authorization: `Token ${token}`,
         },
         body: form_data,
      });
      if (response.ok) {
         // setErrorMessage("Item Created! Create another?")
         // setErrorKey("detail")
         history.push(`/collection/${id}/`);
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
         //maybe I no longer need this bit!
      });

   };
   

   return (
        <div>
            <div className="additemform">
            <h2 id="additemheadertitle"> ADD ITEM TO {collectionData.title} </h2>

            <h4><span className="error">{ (errorKey === "detail") ? errorMessage : null}</span> </h4>
           
            <form>
               <div className="aifa">
                  <label className="atai" htmlFor="name">
                     NAME OF ITEM: 
                     <span className="error">{ (errorKey === "name") ? errorMessage : null}</span> 
                  </label>
                  <input
                     type="text"
                     id="name"
                     onChange={handleChange}
                  />
               </div>

                <div className="aifa">
                    <label className="atai" htmlFor="price">
                       PRICE OF ITEM:
                       <span className="error">{ (errorKey === "price") ? errorMessage : null}</span> 
                    </label>
                    <input
                        type="number"
                        id="price"
                        onChange={handleChange}
                    />
                </div>

                <div className="aifa">
                     <label className="atai" htmlFor="sale_amount">
                       IS THERE A DISCOUNT CURRENTLY OFFERED (%)?:
                       <span className="error">{ (errorKey === "sale_amount") ? errorMessage : null}</span> 
                     </label>
                    <input
                        type="number"
                        id="sale_amount"
                        onChange={handleChange}
                    />
                </div>

                {parseInt(credentials.sale_amount) > 0 && (<div className="aifa">
                    <label className="atai" htmlFor="sale_end_date">
                       WHEN DOES THE DISCOUNT EXPIRE?
                       <span className="error">{ (errorKey === "sale_end_date") ? errorMessage : null}</span> 
                     </label>
                    <input
                        type="date"
                        id="sale_end_date"
                        onChange={handleChange}
                    />
                </div>)}

                {collectionData.attribute1 !== "" && (<div className="aifa">
                    <label className="atai" htmlFor="attribute1">
                       {collectionData.attribute1}:
                       <span className="error">{ (errorKey === "attribute1") ? errorMessage : null}</span> 
                    </label>
                    <input
                        type="text"
                        id="attribute1"
                        onChange={handleChange}
                    />
                </div>)}


                {collectionData.attribute2 !== "" && (<div className="aifa">
                    <label className="atai" htmlFor="attribute2">
                       {collectionData.attribute2}:
                       <span className="error">{ (errorKey === "attribute2") ? errorMessage : null}</span> 
                     </label>
                    <input
                        type="text"
                        id="attribute2"
                        onChange={handleChange}
                    />
                </div>)}

                {collectionData.attribute3 !== "" && (<div className="aifa">
                    <label className="atai" htmlFor="attribute3">
                       {collectionData.attribute3}:
                       <span className="error">{ (errorKey === "attribute3") ? errorMessage : null}</span> 
                     </label>
                    <input
                        type="text"
                        id="attribute3"
                        onChange={handleChange}
                    />
                </div>)}

                {collectionData.attribute4 !== "" && (<div className="aifa">
                    <label className="atai" htmlFor="attribute4">
                       {collectionData.attribute4}:
                       <span className="error">{ (errorKey === "attribute4") ? errorMessage : null}</span> 
                     </label>
                    <input
                        type="text"
                        id="attribute4"
                        onChange={handleChange}
                    />
                </div>)}


                <div className="aifa">
                    <label className="atai" htmlFor="image">
                       IMAGE:
                       <span className="error">{ (errorKey === "image") ? errorMessage : null}</span> 
                     </label>
                    <input 
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                    />
                </div>


                <div className="aifa">
                    <label className="atai" htmlFor="notes">
                       NOTES:
                       <span className="error">{ (errorKey === "notes") ? errorMessage : null}</span> 
                     </label>
                    <input
                        type="textarea"
                        id="notes"
                        onChange={handleChange}
                    />
                </div>


                <div className="aibuttonwrapper">
                    <button className="additembutton" ref={btnRefAdd} type="submit" onClick={handleSubmit}>  ADD TO LIST </button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default AddItemForm;
