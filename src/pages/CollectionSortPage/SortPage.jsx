import React, { Component, useState } from 'react';
import {render} from 'react-dom';
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

    const onSortEnd = ({oldIndex, newIndex}) => {
        setItems(arrayMove(items, oldIndex, newIndex))
    };

    let myArray = []

    items.forEach(item => {myArray.push(item.id)})

    console.log(myArray)

    console.log(items)

  

  return <SortableList items={items} onSortEnd={onSortEnd} />;

}

export default SortableComponent