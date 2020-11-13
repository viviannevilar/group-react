import React, { useState } from 'react';
//import React, { Component, useState } from 'react';
//import {render} from 'react-dom';

import { useParams } from "react-router-dom";

import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { allItems } from "../../data"



const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
        {items.map((value, index) => (
            <SortableItem key={`item-${value.name}`} index={index} value={value.name} />
        ))}
        </ul>
    );
});


function SortableComponent() {

    const [ items, setItems ] = useState(allItems)

   const [rankingData, setRankingData] = useState({ collection_id: 0, ranking: [] });

    const onSortEnd = ({oldIndex, newIndex}) => {
        setItems(arrayMove(items, oldIndex, newIndex))
    };

   let myArray = []

   items.forEach(item => {myArray.push(item.id)})

   // //location
   const { id } = useParams();
   //console.log(id)



   const postData = async () => {
      let token = window.localStorage.getItem("token");


      let formData = new FormData();
      formData.append('ranking', myArray);
      formData.append('collection_id', id);

      console.log("formData: ", formData)


      //function you can call but carry on as well
      const response = await fetch(`${process.env.REACT_APP_API_URL}items/`, {
          method: "post",
          headers: {
              Authorization: `Token ${token}`,
          },
          body: formData,
      });
      return response.json();
  };

  const handleSubmit = (e) => {
      e.preventDefault();

      postData().then((response) => {
          console.log(response)
         //  history.push(`/collection/${id}/`);
         //  window.location.reload();
      });

  };




  

   return (
      <div>
         <SortableList items={items} onSortEnd={onSortEnd} />
         <button onClick={handleSubmit}>Save</button>
      </div>
   )

}

export default SortableComponent