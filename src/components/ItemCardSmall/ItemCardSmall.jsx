import React from "react";
import "./ItemCardSmall.css";

function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
}

function ItemCardSmall(props) {
    const { itemData, collectionData } = props;

    return (

        <div className={`item-card-small ${itemData.is_active === false ? "item-small-closed" : "item-small-open"}`}>

            <p className="cat">Item: {itemData.name}</p>
            <p className="cat">Price: {itemData.price}</p>
            <p className="cat">{itemData.date_created}</p>

        </div>

    );
}

export default ItemCardSmall;
