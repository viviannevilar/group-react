import React, { useState, useEffect } from "react"
import CollectionCard from "../../components/CollectionCard/CollectionCard"

function CollectionsPage() {

    const [collectionsList, setCollectionsList] = useState([]);

    // This variable will have the error code from the request
    const [errorCode, setErrorCode] = useState();

    useEffect(() => {
        let token = window.localStorage.getItem("token");
        console.log("here")

        fetch(`${process.env.REACT_APP_API_URL}active-collections/`, {
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
    }, []);


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
                return <CollectionCard key={key} collectionData={collectionData} />;
            })}
            </div>
        )
    }
    

}

export default CollectionsPage;
