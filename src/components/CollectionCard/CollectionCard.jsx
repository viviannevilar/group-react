import React from "react";
import { Link } from "react-router-dom"
import "./CollectionCard.css"


function CollectionCard(props) {
    const { key, collectionData } = props
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
        <div key={key} className="collection-wrapper">
            <p> {collectionData.title}</p>
            <p> {collectionData.last_updated} </p>
            <button onClick={archiveCollection}>Archive</button>
        </div>
    )

}

export default CollectionCard




{/* <div className="centered flexbox-container">
<PublishConfirm id = {id} />
<Link to={myLink}><button className="btn-small">Edit Project</button></Link>
<DeleteConfirm id = {id} type="project" />
</div> */}