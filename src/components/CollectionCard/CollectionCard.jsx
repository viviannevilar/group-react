import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CollectionCard.css";
import "../../components/Nav/Nav.css";

import archiveicon from "../../images/archive.png"
import deleteicon from "../../images/delete.png"
import editicon from "../../images/edit.png"
import shareicon from "../../images/share.png"
import lefticon from "../../images/lefticon.png"
import { useEffect } from "react";

function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
}

function CollectionCard(props) {

    //////////////////////////// variables ////////////////////////////
    const { collectionData } = props
    const id = collectionData.id
    const linkCollection = "/collection/" + id + "/"
    const [allAttributes, setAllAttributes] = useState([])

    console.log(collectionData)

    useEffect(() => {

        if (collectionData !== undefined) {

            let attributelist = []
            attributelist.push("Price");
            attributelist.push("Discount");

            if (collectionData.attribute1 !== "" && collectionData.attribute1 !== null) {
                attributelist.push(collectionData.attribute1);
            }
            if (collectionData.attribute2 !== "" && collectionData.attribute2 !== null) {
                attributelist.push(collectionData.attribute2);
            }
            if (collectionData.attribute3 !== "" && collectionData.attribute3 !== null) {
                attributelist.push(collectionData.attribute3);
            }

            if (collectionData.attribute4 !== "" && collectionData.attribute4 !== null) {
                attributelist.push(collectionData.attribute4);
            }
            setAllAttributes(attributelist.join(", "))

        }

    }, [collectionData]);






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
        alert("Share this collection with others - your collection URL was copied to your clipboard!")

    }

    // Delete collection

    const deleteCollection = async (e) => {
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


        <div className="box">
            <div id="buttonrowcontainer" style={collectionData.is_active ? {} : { opacity: "0.4" }} >
                {/* <img className="changeicons" alt="archiveicon" src={activeicon} /> */}
                <div className="buttoncontainer">
                    <img style={{ cursor: "pointer" }} className="changeicons" alt="archiveicon" src={archiveicon} onClick={() => archiveCollection()} />

                    <Link to={`/editcollection/${collectionData.id}`}>
                        <img style={{ cursor: "pointer" }} className="changeicons" alt="editicon" src={editicon} />
                    </Link>

                    <img style={{ cursor: "pointer" }} className="changeicons" alt="deleteicon" src={deleteicon} onClick={() => deleteCollection()} />
                </div>
            </div>


            <div className="collectioninfocontainer">

                <Link id="collectionlink" to={linkCollection}>
                    <img style={{ cursor: "pointer" }} className="changeicons" alt="lefticon" src={lefticon} />

                    <p style={{ cursor: "pointer" }} id="collectiontitle">{collectionData.title}</p>
                </Link>

                {/* <p>Last Updated {formatDate(collectionData.)} </p> */}

                <p id="compareatttributeslist">Comparing items by: {allAttributes} </p>



                <div id="shareocllectioncontainer">
                    <img style={{ cursor: "pointer" }} className="shareicons" alt="shareicon" src={shareicon} onClick={() => shareCollection()} />
                    <p style={{ cursor: "pointer" }} onClick={shareCollection}>Share Collection</p>
                </div>

                <div id="dateupdatedcontainer">
                    <p>Last Updated {formatDate(collectionData.last_updated)} </p>
                </div>
            </div>
        </div >
    )
}


export default CollectionCard


