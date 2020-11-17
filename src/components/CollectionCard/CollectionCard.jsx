import React from "react";
import { Link } from "react-router-dom";
import "./CollectionCard.css";
import "../../components/Nav/Nav.css";


function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
}

function CollectionCard(props) {

    //////////////////////////// variables ////////////////////////////
    const { collectionData } = props
    const id = collectionData.id
    const linkCollection = "/collection/" + id + "/"


    //////////////////////////// methods ////////////////////////////

    // Archive collection
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


    function shareCollection() {

        const linkText = "https://glacial-badlands-43820.herokuapp.com/collection/shared/" + collectionData.signed_pk + "/"

        navigator.clipboard.writeText(linkText)
        alert("Your collection URL was copied to your clipboard!")

    }

    // Delete collection

    const deleteCollection = async (e) => {
        e.preventDefault();
        let token = window.localStorage.getItem("token");
        let urlPath = "collection/" + collectionData.id

        const response = await fetch(`${process.env.REACT_APP_API_URL}${urlPath}/`, {
            method: "delete",
            headers: {
                Authorization: `Token ${token}`,
            },
        });

        window.location.reload();
    }



    return (


        <div className="collection-wrapper">
            <p> <Link to={linkCollection}>{collectionData.title}</Link></p>

            <p>Date Created {formatDate(collectionData.date_created)} </p>
            <p>Last Updated {formatDate(collectionData.last_updated)} </p>
            <button onClick={archiveCollection}>{collectionData.is_active ? "Archive" : "Unarchive"}</button>
            <button onClick={shareCollection}>Share Collection</button>
            <Link to={`/editcollection/${collectionData.id}`}><button >Edit Collection</button></Link>
            <button onClick={deleteCollection}>Delete Collection</button>

        </div >
    )
}


export default CollectionCard


