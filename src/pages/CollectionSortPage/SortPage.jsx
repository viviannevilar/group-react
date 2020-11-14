//////////////////////////// imports ////////////////////////////

import React, { useState } from 'react';
import { useParams, useHistory, useLocation } from "react-router-dom";

import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

//import { allItems } from "../../data"


//////////////////////////// components ////////////////////////////

// sortables
const SortableItem = SortableElement(({value}) => <ul>{value.name}, order: {value.ranking}</ul>);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
        {items.map((value, index) => (
            <SortableItem key={`item-${value.name}`} index={index} value={value} />
        ))}
        </ul>
    );
});

//////////////////////////// main function ////////////////////////////
function SortableComponent(props) {

   /////////////// variables

   // location
   const { id } = useParams();
   const history = useHistory();

   // get props passed down from <Link > component in CollectionDetailPage
   let data = useLocation()
   let itemsProps = data.state.itemsProps
   const [items, setItems] = useState(itemsProps);

   // change order of elements
   const onSortEnd = ({oldIndex, newIndex}) => {
      setItems(arrayMove(items, oldIndex, newIndex))
   };

   // get an array with the item.ids in the order they are displayed on the screen
   let myArray = []
   items.forEach(item => {myArray.push(item.id)})


   /////////////// methods

   // save order of items in the backend
   const postData = async () => {

      // get token for authentication
      let token = window.localStorage.getItem("token");

      // get the data ready in a "dictionary"
      let jsonData = {}
      jsonData.ranking = myArray
      jsonData.collection_id = id

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
         console.log(response)
         history.push(`/collection/${id}/`);
         window.location.reload();
      });

   };


  
   /////////////// return
   return (
      <div>
         <SortableList items={items} onSortEnd={onSortEnd} />
         <button onClick={handleSubmit}>Save</button>
      </div>
   )

}

export default SortableComponent