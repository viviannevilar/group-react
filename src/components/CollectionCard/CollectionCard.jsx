import React from "react";
import "./CollectionCard.css"


function CollectionCard(props) {
    const { collectionData } = props
    const id = collectionData.id
    console.log(id)

    const archiveCollection = async (e) => {
        e.preventDefault();
        let token = window.localStorage.getItem("token");
    
        const response = await fetch(`${process.env.REACT_APP_API_URL}collection/${id}/archive/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        });

        window.location.reload();
        return response.json();
    }

    return (
        <div className="collection-wrapper">
            <p> {collectionData.title}</p>
            <p> {collectionData.last_updated} </p>
            <button onClick={archiveCollection}>{ collectionData.is_active ? "Archive" : "Unarchive" }</button>
        </div>
    )

}


export default CollectionCard


