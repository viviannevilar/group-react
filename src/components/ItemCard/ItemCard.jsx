import React from "react";
//import { Link } from "react-router-dom";
import "./ItemCard.css";


function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
}

function ItemCard(props) {
    const { projectData, collectionData } = props;


    return (
        <div className="project-card" id={projectData.is_active === false ? "project-closed" : "project-open"}>
            <p className="cat">Item: {projectData.name}</p>

            <img alt="Item" src={projectData.image} />

            <div className="project-infosummary">
                <p className="cat">Item: {projectData.name}</p>
                {collectionData.attribute1 !== "" && (<p>{collectionData.attribute1}:  {projectData.attribute1} {projectData.attribute1 !== "" ? "" : "No information added for this attribute"}  </p>)}
                {collectionData.attribute2 !== "" && (<p>{collectionData.attribute2}:  {projectData.attribute2} {projectData.attribute2 !== "" ? "" : "No information added for this attribute"}  </p>)}
                {collectionData.attribute3 !== "" && (<p>{collectionData.attribute3}:  {projectData.attribute3} {projectData.attribute3 !== "" ? "" : "No information added for this attribute"}  </p>)}
                {collectionData.attribute4 !== "" && (<p>{collectionData.attribute4}:  {projectData.attribute4} {projectData.attribute4 !== "" ? "" : "No information added for this attribute"}  </p>)}
                {collectionData.attribute5 !== "" && (<p>{collectionData.attribute5}:  {projectData.attribute5} {projectData.attribute5 !== "" ? "" : "No information added for this attribute"}  </p>)}
                <p className="cat">Notes: {projectData.notes} {projectData.notes !== "" ? "" : "No additional notes for this item"} </p>

                {!projectData.is_active && (
                    <p id="author" className="cat">Item: {projectData.name.toUpperCase()} is currently archived and does not appear in attribute comparisons</p>
                )}

            </div>
        </div>
    );
}

export default ItemCard;
