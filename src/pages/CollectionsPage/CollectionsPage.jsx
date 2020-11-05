import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import CollectionCard from "../../components/CollectionCard/CollectionCard"

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
            <div>
                <img alt="" src={"https://i.imgur.com/3BOX1wi.gif"} />
            </div>
        )

        // if not found (project doesn't exist) 
    } else if (errorCode === 404) {

        return (
            <div>
                <h1> Collection not found! </h1>
            </div>
        )
        // if not logged in or wrong credentials
    } else if ((errorCode === 401) || (errorCode === 403)) {

        return (
            <div>
                <h1>You don't have permission to see this page! </h1>
            </div>
        )

        // if there are no collections to show
    } else if (!collectionsList || collectionsList.length === 0) {

        return (
            <div>
                <h1>No collections to show</h1>
                <Link to={`/newcollection/`}><button >Create New Collection</button></Link>
            </div>
        )

        // if the credentials match and there are collections to show
    } else {

        return (

            <div>
                <h1>{(activePath === "active-collections/") ? "Collections" : "Archived Collections"} </h1>

                {/* display list of collections */}
                {collectionsList.map((collectionData, key) => {
                    return <CollectionCard key={key} collectionData={collectionData} />;
                })}

                <br></br>

                {/* button to see archived collections or active collections */}
                {
                    (activePath === "archived-collections/") ?
                        <Link to={`/collections/`}><button >See active collections</button></Link> :
                        <Link to={`/collections-archive/`}><button >See archived collections</button></Link>
                }
                 <Link to={`/newcollection/`}><button >Create New Collection</button></Link>
            </div>
        )
    }


}

export default CollectionsPage;
