import React from "react";
//import { Link } from "react-router-dom";
import "./ItemCard.css";

function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
}

function ItemCard(props) {
    const { item, collectionData } = props;


    return (

        <div className="project-card" id={item.is_active === false ? "project-closed" : "project-open"}>

            <p className="cat">Item: {item.name}</p>

            <img alt="Item" src={item.image} />

            <div className="project-infosummary">
                <p className="cat">Item: {item.name}</p>
                {collectionData.attribute1 !== "" && (<p>{collectionData.attribute1}:  {item.attribute1} {item.attribute1 !== "" ? "" : "No information added for this attribute"}  </p>)}
                {collectionData.attribute2 !== "" && (<p>{collectionData.attribute2}:  {item.attribute2} {item.attribute2 !== "" ? "" : "No information added for this attribute"}  </p>)}
                {collectionData.attribute3 !== "" && (<p>{collectionData.attribute3}:  {item.attribute3} {item.attribute3 !== "" ? "" : "No information added for this attribute"}  </p>)}
                {collectionData.attribute4 !== "" && (<p>{collectionData.attribute4}:  {item.attribute4} {item.attribute4 !== "" ? "" : "No information added for this attribute"}  </p>)}
                {collectionData.attribute5 !== "" && (<p>{collectionData.attribute5}:  {item.attribute5} {item.attribute5 !== "" ? "" : "No information added for this attribute"}  </p>)}
                <p className="cat">Notes: {item.notes} {item.notes !== "" ? "" : "No additional notes for this item"} </p>

                {!item.is_active && (
                    <p id="author" className="cat">Item: {item.name.toUpperCase()} is currently archived and does not appear in attribute comparisons</p>
                )}

            </div>
        </div>
    );
}

export default ItemCard;
