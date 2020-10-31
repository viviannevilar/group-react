import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import CollectionCard from "../../components/CollectionCard/CollectionCard"

function CollectionsPage() {

    const location = useLocation()

    const [activePath, setActivePath] = useState("")

    useEffect(() => {

        if (location.pathname === "/collections/") {
            setActivePath("active-collections/")
            console.log("here")
            //activePath = "active-collections"
        } else {
            setActivePath("archived-collections/")
            //activePath = "archived-collections"
        }

    }, [location]);


    const [collectionsList, setCollectionsList] = useState([]);

    // This variable will have the error code from the request
    const [errorCode, setErrorCode] = useState();

    useEffect(() => {

        let token = window.localStorage.getItem("token");

        fetch(`${process.env.REACT_APP_API_URL}${activePath}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            }
        })
        .then((results) =>  {
            setErrorCode(results.status)
            console.log("results.status: ", results.status)
            return results.json();
        })
        .then((data) => {
            setCollectionsList(data);
        })
     }, [activePath]);


    //The page will return different things depending on whether there are errors, or no collections, or some collections to show
    if ((errorCode === 401) || errorCode === 403) {

        return (
            <h1>You don't have permission to see this page! </h1>
        )

    } else if (!collectionsList || collectionsList.length === 0) {

        return (
            <div>
                <h1>No collections to show</h1>
            </div>
        )

    } else {
        
        return (
            <div>
            {collectionsList.map((collectionData, key) => {
                return <CollectionCard key={key} collectionData={collectionData}/>;
            })}

            <br></br>
            {(activePath === "active-collections/") && <Link to={`/collections-archive/`}><button >See archived collections</button></Link>}
            {(activePath === "archived-collections/") && <Link to={`/collections/`}><button >See active collections</button></Link>}
            </div>
        )
    }
    

}

export default CollectionsPage;
