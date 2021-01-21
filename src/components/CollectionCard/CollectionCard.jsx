import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import "./CollectionCard.css";
import "../../components/Nav/Nav.css";

import archiveicon from "../../images/archive.png"
import deleteicon from "../../images/delete.png"
import editicon from "../../images/edit.png"
import shareicon from "../../images/share.png"
import lefticon from "../../images/lefticon.png"




function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
}

function CollectionCard(props) {

    //////////////////////////// variables ////////////////////////////
    const { collectionData, toggleModal, setSignedPK, setCollectionName } = props
    const id = collectionData.id
    const linkCollection = "/collection/" + id + "/"
    const [allAttributes, setAllAttributes] = useState([])
    const history = useHistory();
    const [isOwner, setIsOwner] = useState(true)




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

            const owner = collectionData.user
            const username = window.localStorage.getItem("username");
            setIsOwner(owner === username)

        }

    }, [collectionData]);






    //////////////////////////// methods ////////////////////////////

    // Archive collection
    const archiveCollection = async () => {
        //   e.preventDefault();
        let token = window.localStorage.getItem("token");

        const response = await fetch(`${process.env.REACT_APP_API_URL}collection/${id}/archive/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        });

        window.location.reload();
        history.push("/collections/");

        return response.json();
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

    // Get project details


    
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


                <div>
                  {isOwner  
                  ? <div className="sharecollectioncontainer" style={{ cursor: "pointer" }} onClick={() => {toggleModal(); setSignedPK(collectionData.signed_pk); setCollectionName(collectionData.title); }}>
                      <img className="shareicons" alt="shareicon" src={shareicon} />
                      <p>Share Collection</p>
                  </div> 
                  : <div className="sharecollectioncontainer gray">
                    <img className="shareicons transparent" alt="shareicon" src={shareicon} />
                    <p>SHARED COLLECTION</p>
                    </div>}

                </div>

                <div id="dateupdatedcontainer">
                    <p>Last Updated {formatDate(collectionData.last_updated)} </p>
                </div>
            </div>
        </div >
    )
}


export default CollectionCard


