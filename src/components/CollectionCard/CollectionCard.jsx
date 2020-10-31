import React from "react";
import { Link } from "react-router-dom"
import "./CollectionCard.css"


function CollectionCard(props) {
    const { key, collectionData } = props

    return (
        <div key={key} className="collection-wrapper">
            <p> {collectionData.title}</p>
            <p> {collectionData.last_updated} </p>
        </div>
    )

}

export default CollectionCard