import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import CollectionCard from "../../components/CollectionCard/CollectionCard"
import Nav from "../../components/Nav/Nav";
import "./CollectionsPage.css";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import addicon from "../../images/add.png"
import archiveicon from "../../images/archive.png"
import activeicon from "../../images/activeicon.png"
import "../../components/CollectionCard/CollectionCard.css"
import logoicon from "../../images/Comparalist_rectangle.png"

function CollectionsPage() {

    //////////////////////////// variables ////////////////////////////

    // this checks the url (/collections/ or /collections-archive/)
    const location = useLocation()

    const [activePath, setActivePath] = useState("active-collections/")

    const [collectionsList, setCollectionsList] = useState([]);

    const [isLoading, setIsLoading] = useState(true)

    // This variable will store the error code from the request
    const [errorCode, setErrorCode] = useState();


    //////////////////////////// methods ////////////////////////////

    // the page shows different things depending on whether the path is collections or archived-collections. 
    // this function checks the pathname and sets the state with the path
    // when the location (url) changes, the value of activePath is updated
    useEffect(() => {

        if (location.pathname === "/collections/") {
            setActivePath("active-collections/")
        } else {
            setActivePath("archived-collections/")
        }

    }, [location]);

    // fetch the data (archived or active, depending on the value of activePath)
    useEffect(() => {

        let token = window.localStorage.getItem("token");

        fetch(`${process.env.REACT_APP_API_URL}${activePath}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            }
        })
            .then((results) => {
                setErrorCode(results.status)
                return results.json();
            })
            .then((data) => {
                setCollectionsList(data);
                setIsLoading(false)
            })
    }, [activePath]);


    //////////////////////////// return ////////////////////////////

    // while it is fetching the data show .gif
    if (isLoading) {

        return (
            <div className="loadingpage">
                <img alt="" src={"https://i.imgur.com/3BOX1wi.gif"} />
            </div>
        )

        // if not found (project doesn't exist) 
    } else if (errorCode === 404) {

        return (

            <ErrorComponent errorMessage="Collection not found!" errorNumber="404" />

        )
        // if not logged in or wrong credentials
    } else if ((errorCode === 401) || (errorCode === 403)) {

        return (
            <ErrorComponent errorMessage="You don't have permission to see this page!" errorNumber="401" />
        )

        // if there are no collections to show
    } else {

        return (
            <div>
                <div>
                    <Nav />
                </div>

                <div className="containerwholecollectionpage">
                    <div id="collectionsheadertitle">
                        <h1>{(activePath === "active-collections/") ? "Collections" : "Archived Collections"} </h1>
                    </div>
                    <div className="cpbuttoncontainer">
                        {/* button to see archived collections or active collections */}
                        {(activePath === "archived-collections/") ?

                            <Link className="addcollectioncontainer" to={`/collections/`}>
                                <img style={{ cursor: "pointer" }} className="changeicons" alt="activeicon" src={activeicon} />
                                <p style={{ cursor: "pointer" }} > See Active Collections</p>
                            </Link>
                            :
                            <Link className="addcollectioncontainer" to={`/collections-archive/`}>
                                <img style={{ cursor: "pointer" }} className="changeicons" alt="archiveicon" src={archiveicon} />
                                <p style={{ cursor: "pointer" }} > See Archived Collections</p>
                            </Link>}



                        <Link className="addcollectioncontainer" to={`/newcollection/`}>
                            <img style={{ cursor: "pointer" }} className="changeicons" alt="addicon" src={addicon} />
                            <p style={{ cursor: "pointer" }} > Create Collection</p>
                        </Link>



                    </div>
                    {/* display list of collections */}
                    {collectionsList.length > 0 ? (<div className="box-wrap">
                        {collectionsList.map((collectionData, key) => {
                            return <CollectionCard key={key} collectionData={collectionData} />;
                        })}
                    </div>) : (<div className="nodatacontainer">
                        <img className="nodatalogo" alt="nodatalogo" src={logoicon} />
                        <p>No collections have been added yet to your account</p>

                    </div>)}


                </div>
            </div >
        )
    }

}

export default CollectionsPage;
