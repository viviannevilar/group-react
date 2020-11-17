//////////////////////////// imports ////////////////////////////

import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from "react-router-dom";

// sorting
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { setTokenSourceMapRange } from 'typescript';

// styling
import "./SortPage.css"
import moveicon from "../../images/reorder.png"
import nophoto from '../../images/noimage.PNG';

// components
import Nav from "../../components/Nav/Nav";
//mport Icons from "../../components/Icons/Icons";


import { FaRegCheckSquare, FaRegWindowClose  } from 'react-icons/fa';

// import BsCheckBox from 'react-icons/lib/fa/pencil'

//////////////////////////// components ////////////////////////////

// sortables

// each item
const SortableItem = SortableElement(({value, sortIndex}) => {
   return(
      <div className={`sortable-item ${value.is_active ? "" : "archived-item"}`}>
         {/* <div className={`${value.is_active ? "overlay-null" : "overlay"}`}></div> */}
         <img style={{ cursor: "pointer" }} className="changeicons sort-icons" alt="moveicon" src={moveicon} />
         {value.name}
         {value.image !== null ? <img className="item-small" alt="Item" src={value.image} /> : <img className="item-small" alt="Item" src={nophoto} />}
         
      </div>
   )
});

// the container with all items
const SortableList = SortableContainer(({items}) => {
    return (
        <div id="sortable-container">
        {items.map((value, index) => (
            <SortableItem key={`item-${index}`} index={index} sortIndex={index} value={value} />
        ))}
        </div>
    );
});

//////////////////////////// main function ////////////////////////////
function SortableComponent(props) {

   /////////////// variables

   // location
   const { id } = useParams();
   const history = useHistory();

   // error handling
   const [hasError, setHasError] = useState(false)
   const [errorMessage, setErrorMessage] = useState()
   const [token, setToken] = useState(window.localStorage.getItem("token"))

   // get props passed down from <Link > component in CollectionDetailPage
   let data = useLocation()
   const [items, setItems] = useState(data.state.itemsProps);

   // change order of elements
   const onSortEnd = ({oldIndex, newIndex}) => {
      setItems(arrayMove(items, oldIndex, newIndex))
      setToken(window.localStorage.getItem("token"))
   };

   // get an array with the item.ids in the order they are displayed on the screen
   let myArray = []
   items.forEach(item => {myArray.push(item.id)})


   /////////////// methods

   // save order of items in the backend
   const postData = async () => {

      // // get token for authentication
      // let token = window.localStorage.getItem("token");

      // get the data ready in a "dictionary"
      let jsonData = {}
      jsonData.ranking = myArray
      jsonData.collection_id = id

      console.log(token)

      const response = await fetch(`${process.env.REACT_APP_API_URL}collection/${id}/ranking/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(jsonData),
      });
      return response.json();
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      postData().then((response) => {
         console.log("---------------- RESPONSE ", response)
         if (response.ok) {
            history.push(`/collection/${id}/`);
            window.location.reload();
         } else {
            console.log("items order ---- : ", response.detail)
            setErrorMessage(response.detail)
            setHasError(true)
         }

      });

   };


   useEffect(() => {

      if (token === null) {
         console.log("token === null! ")
         setErrorMessage("You are not logged in! Please log in to see your items!")
         setHasError(true)
      } 
 
   }, [token])

   const cancelSubmit = () => {
      history.push(`/collection/${id}/`);
   }

  
   /////////////// return
   return (
      
      <div className="page-wrapper">

            {/* There is NO error */}
            {(!hasError) ? (<div>
               <div className="sort-buttons-container">
                  <a className="icon-a-tag" onClick={handleSubmit}><FaRegCheckSquare className="fa-icon"/></a>
                  <a className="icon-a-tag" onClick={cancelSubmit}><FaRegWindowClose className="fa-icon"/></a>
               </div>
               <SortableList items={items} onSortEnd={onSortEnd} />
            </div>) : null}




            {/* There IS an error message */}
            {(hasError) ? (<div>
               <div id="errormessage">
                  <br></br>
                  <img className="backgroundimage" alt="Error!" src="https://www.pngitem.com/pimgs/m/119-1190787_warning-alert-attention-search-error-icon-hd-png.png" />
                  <h2>{errorMessage}</h2>
               </div>
            </div>) : null}

      </div>
   )

}

export default SortableComponent



